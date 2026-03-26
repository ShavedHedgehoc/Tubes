import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaDb, PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import {
  IMappedExtrusionParams,
  IMappedOffsetParams,
  IMappedSealantParams,
  IMappedVarnishParams,
  mapParams,
  mappedSummary,
} from "./mapper";
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { parseAssemblies, parsedAssembly } from "src/helpers/parse-assemblies";
import { ChangeSummaryStateDto } from "./dto/change-summary-state.dto";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import { Prisma } from "generated/prisma";
import {
  ActiveSummaryResponse,
  IStatusCounter,
  IStatus,
} from "./dto/active-summary.response";
import { AvailableSummariesResponse } from "./dto/available-summaries.response";
import { GetPostStatusesDto } from "./dto/get-post-statuses.dto";

type FullSpecification = Prisma.SpecificationGetPayload<{
  include: { material: { include: { consumed_materials: true } } };
}>;

const summaryInclude = {
  batch: true,
  notes: true,
  statuses: {
    include: {
      operation: { include: { min_rank: true } },
      post: true,
    },
    orderBy: { id: "asc" as const },
  },
  product: {
    include: {
      tresholds: {
        orderBy: { createdAt: "desc" as const },
        take: 1,
      },
    },
  },
  extrusion_params: { orderBy: { id: "desc" as const }, take: 1 },
  varnish_params: { orderBy: { id: "desc" as const }, take: 1 },
  offset_params: { orderBy: { id: "desc" as const }, take: 1 },
  sealant_params: { orderBy: { id: "desc" as const }, take: 1 },
  specifications: {
    include: {
      material: {
        include: {
          consumed_materials: {
            orderBy: { id: "desc" as const },
            take: 1,
          },
        },
      },
    },
  },
} satisfies Prisma.SummaryInclude;
type SummaryWithIncludes = Prisma.SummaryGetPayload<{
  include: typeof summaryInclude;
}>;

export interface IMappedMaterial {
  code: string;
  name: string;
  scanned: boolean;
}

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  private async createSpecifications(
    { summaryId, value }: { summaryId: number; value: string },
    tx?: Prisma.TransactionClient,
  ) {
    const db = (tx ?? this.prisma) as PrismaDb;
    const res = parseAssemblies(value);
    if (res.length < 1)
      throw new HttpException("Ошибка спецификации", HttpStatus.BAD_REQUEST);

    await db.material.createMany({
      data: res.map((item: parsedAssembly) => ({
        code: item.code,
        name: item.name,
        post_number: Number(item.post),
      })),
      skipDuplicates: true,
    });

    const materials = await db.material.findMany({
      where: { code: { in: res.map((i: parsedAssembly) => i.code) } },
      select: { id: true, code: true },
    });

    const materialMap = new Map(materials.map((m) => [m.code, m.id]));

    await db.specification.createMany({
      data: res.map((item: parsedAssembly) => ({
        summary_id: summaryId,
        material_id: materialMap.get(item.code)!,
      })),
      skipDuplicates: true,
    });
  }

  async bulkCreateSummariesNew(dto: CreateSummaryDto) {
    if (dto.rows.length < 1)
      throw new HttpException("Строки отсутствуют!", HttpStatus.BAD_REQUEST);
    const parsedDate = new Date(`${dto.summaryDate} 12:00:00:000`);
    return await this.prisma.$transaction(
      async (tx) => {
        for (const item of dto.rows) {
          const conveyor = await tx.conveyor.findUnique({
            where: { name: item.conveyor },
          });
          if (!conveyor)
            throw new HttpException(
              `${item.conveyor} - ${ApiMessages.CONVEYOR_NOT_FOUND}`,
              HttpStatus.NOT_FOUND,
            );

          const product = await tx.product.upsert({
            where: { code: item.code1C },
            update: {
              marking: item.product_marking,
              name: item.product_name,
            },
            create: {
              code: item.code1C,
              marking: item.product_marking,
              name: item.product_name,
            },
          });

          const batch = await tx.batch.upsert({
            where: { name: item.batch },
            update: {},
            create: { name: item.batch },
          });

          const shift =
            item.shift === "day" ? 1 : item.shift === "night" ? 2 : null;
          if (!shift)
            throw new HttpException("Ошибка парсинга!", HttpStatus.BAD_REQUEST);

          const existsSummary = await tx.summary.findFirst({
            where: {
              date: parsedDate,
              batch: { name: item.batch },
              product: { code: item.code1C },
              shift,
            },
          });

          if (existsSummary)
            throw new HttpException(
              `Дубликат: ${item.code1C}`,
              HttpStatus.BAD_REQUEST,
            );

          const summary = await tx.summary.create({
            data: {
              date: parsedDate,
              product_id: product.id,
              conveyor_id: conveyor.id,
              batch_id: batch.id,
              plan: Number(item.plan),
              shift,
            },
          });

          await this.createSpecifications(
            {
              summaryId: summary.id,
              value: item.specification,
            },
            tx,
          );
        }
      },
      {
        timeout: 10000,
      },
    );
  }

  async deleteSummary(id: number) {
    await this.prisma.summary.delete({ where: { id: id } });
  }

  async getSummariesList(query: GetSummariesListDto) {
    const startDate = new Date(new Date(query.start_date).setHours(0));
    const endDate = new Date(new Date(query.end_date).setHours(23));

    type SummaryWhere = Prisma.Args<
      typeof this.prisma.summary,
      "findMany"
    >["where"];
    const where: SummaryWhere = {
      date: {
        gte: startDate,
        lte: endDate,
      },
      ...(query.conveyors?.length && {
        conveyor_id: { in: query.conveyors },
      }),
      product: query.code
        ? {
            code: { contains: query.code, mode: "insensitive" },
          }
        : undefined,
      ...(query.states?.includes(2) && { isFinished: true }),
      ...(query.states?.includes(1) && { isActive: true }),
    };

    const [count, summaries] = await Promise.all([
      this.prisma.summary.count({ where }),
      this.prisma.summary.findMany({
        where,
        include: {
          product: true,
          batch: true,
          conveyor: true,
          _count: {
            select: {
              statuses: true,
            },
          },
        },
        orderBy: [
          { date: "asc" },
          { conveyor: { name: "asc" } },
          { shift: "asc" },
        ],
        take: query.limit,
        skip: query.limit * (query.page - 1),
      }),
    ]);

    return { total: count, rows: summaries };
  }

  private async getIdleTimeSum(
    postVal: number,
    createdAt?: Date | null,
  ): Promise<number> {
    if (!createdAt) return 0;

    const aggregate = await this.prisma.status.aggregate({
      _sum: {
        idle_time: true,
      },
      where: {
        post: {
          value: postVal,
        },
        idle_time: { not: null },
        createdAt: { gt: createdAt },
      },
    });

    return aggregate._sum.idle_time ?? 0;
  }

  private mapMaterialsByPost(
    specs: FullSpecification[],
    postNumber: number,
  ): IMappedMaterial[] {
    return specs
      .filter((s) => s.material.post_number === postNumber)
      .map((s) => ({
        code: s.material.code,
        name: s.material.name,
        scanned: s.material.consumed_materials.length > 0,
      }));
  }

  async getActiveSummaryRecordByConveyorId(
    conveyor_id: number,
  ): Promise<ActiveSummaryResponse> {
    const activeRecord = (await this.prisma.summary.findFirst({
      where: { conveyor_id, isActive: true },
      include: summaryInclude,
    })) as SummaryWithIncludes | null;

    if (!activeRecord) {
      throw new HttpException(
        "Активная сводка не найдена",
        HttpStatus.NOT_FOUND,
      );
    }

    const [firstExtrusion = null] = activeRecord.extrusion_params;
    const [firstVarnish = null] = activeRecord.varnish_params;
    const [firstOffset = null] = activeRecord.offset_params;
    const [firstSealant = null] = activeRecord.sealant_params;

    const extrusionParams = mapParams<IMappedExtrusionParams>(firstExtrusion);
    const varnishParams = mapParams<IMappedVarnishParams>(firstVarnish);
    const offsetParams = mapParams<IMappedOffsetParams>(firstOffset);
    const sealantParams = mapParams<IMappedSealantParams>(firstSealant);

    const [allOperations, idleTimesRaw] = await Promise.all([
      this.prisma.operation.findMany({
        include: { post: true, min_rank: true },
        orderBy: { id: "asc" },
      }),
      Promise.all([
        this.getIdleTimeSum(1, extrusionParams?.createdAt),
        this.getIdleTimeSum(2, varnishParams?.createdAt),
        this.getIdleTimeSum(3, offsetParams?.createdAt),
        this.getIdleTimeSum(4, sealantParams?.createdAt),
      ]),
    ]);

    const getStatusDataByPost = (postValue: number) => {
      const postStatuses = activeRecord.statuses.filter(
        (s) => s.post?.value === postValue,
      );
      const last = postStatuses[postStatuses.length - 1] ?? null;

      const current: IStatus | null = last
        ? {
            idle: last.idle ?? false,
            finished: last.finished ?? false,
            state:
              last.finished === true
                ? "finished"
                : last.idle === true
                  ? "idle"
                  : "working",
            operation_description:
              last.operation?.description ?? "Нет описания",
            createdAt: last.createdAt,
            operation_id: last.operation_id,
          }
        : {
            idle: false,
            finished: false,
            state: "working",
            operation_description: "-",
            createdAt: null,
            operation_id: null,
          };

      const counters: IStatusCounter[] = postStatuses.map((s) => ({
        counter_value: Number(s.counter_value) || 0,
        idle: s.idle ?? false,
        createdAt: s.createdAt,
      }));

      return { current, counters };
    };

    const ext = getStatusDataByPost(1);
    const varn = getStatusDataByPost(2);
    const off = getStatusDataByPost(3);
    const seal = getStatusDataByPost(4);

    const flatOps = allOperations.map((op) => ({
      id: op.id,
      value: op.value,
      description: op.description,
      min_rank: op.min_rank?.val ?? 0,
      post_value: op.post?.value,
    }));

    const notesMap = activeRecord.notes.reduce(
      (acc, n) => ({ ...acc, [n.post_id]: n.note }),
      {} as Record<number, string>,
    );

    return {
      data: mappedSummary({
        summary: activeRecord,
        batch: activeRecord.batch,
        product: activeRecord.product,
      }),
      tresholds: activeRecord.product.tresholds[0] ?? null,

      extrusionParams: mapParams<IMappedExtrusionParams>(
        activeRecord.extrusion_params[0],
      ),
      varnishParams: mapParams<IMappedVarnishParams>(
        activeRecord.varnish_params[0],
      ),
      offsetParams: mapParams<IMappedOffsetParams>(
        activeRecord.offset_params[0],
      ),
      sealantParams: mapParams<IMappedSealantParams>(
        activeRecord.sealant_params[0],
      ),

      extrusion_note: notesMap[1] ?? null,
      varnish_note: notesMap[2] ?? null,
      offset_note: notesMap[3] ?? null,
      sealant_note: notesMap[4] ?? null,

      extrusionStatus: ext.current,
      extrusionStatusCounters: ext.counters,
      extrusionOperations: flatOps.filter((o) => o.post_value === 1),

      varnishStatus: varn.current,
      varnishStatusCounters: varn.counters,
      varnishOperations: flatOps.filter((o) => o.post_value === 2),

      offsetStatus: off.current,
      offsetStatusCounters: off.counters,
      offsetOperations: flatOps.filter((o) => o.post_value === 3),

      sealantStatus: seal.current,
      sealantStatusCounters: seal.counters,
      sealantOperations: flatOps.filter((o) => o.post_value === 4),

      extrusion_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        1,
      ),
      varnish_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        2,
      ),
      offset_materials: this.mapMaterialsByPost(activeRecord.specifications, 3),
      sealant_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        4,
      ),

      extrusionIdleTime: idleTimesRaw[0] ?? 0,
      varnishIdleTime: idleTimesRaw[1] ?? 0,
      offsetIdleTime: idleTimesRaw[2] ?? 0,
      sealantIdleTime: idleTimesRaw[3] ?? 0,
    };
  }

  async getAvailableSummariesRecordByConveyorId(
    conveyor_id: number,
  ): Promise<AvailableSummariesResponse> {
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const summaries = await this.prisma.summary.findMany({
      where: {
        conveyor_id: conveyor_id,
        isActive: false,
        isFinished: false,
        date: { gte: today },
      },
      include: { product: true, batch: true },
      orderBy: [{ date: "asc" }, { shift: "asc" }],
    });
    return { summaries };
  }

  async finishSummary(dto: ChangeSummaryStateDto) {
    const summary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        isActive: false,
        isFinished: true,
      },
    });
    return summary;
  }

  async startSummary(dto: ChangeSummaryStateDto) {
    const summary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        isActive: true,
        isFinished: false,
      },
    });
    return summary;
  }

  async getSummaryById(id: number) {
    const record = await this.prisma.summary.findUnique({
      where: { id: id },
      include: {
        batch: true,
        product: true,
        conveyor: true,
      },
    });
    return record;
  }

  async getPostStatuses(query: GetPostStatusesDto) {
    const statuses = await this.prisma.status.findMany({
      where: {
        summary_id: query.summary_id,
        post: { value: query.post_val },
      },
      include: { operation: true, employee: true },
      orderBy: [{ createdAt: "asc" }],
    });
    return { statuses };
  }
}
