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
// import { Prisma, Treshold } from "generated/prisma";
import {
  ActiveSummaryResponse,
  IStatusCounter,
  IStatus,
} from "./dto/active-summary.response";
import { AvailableSummariesResponse } from "./dto/available-summaries.response";
import { GetPostStatusesDto } from "./dto/get-post-statuses.dto";
import { GetStatusesDto } from "./dto/get-statuses.dto";
import { StartSummaryDto } from "./dto/start-summary.dto";
import { DataService } from "./data.service";
import { MutationService } from "./mutation.service";
import { UpdateSummaryDto } from "./dto/update-summary.dto";
import { ChartDataService } from "./chart-data.service";
import { GetCrewsStatsDto } from "./dto/get-crews-stats.dto";
import { Prisma, Treshold } from "db";

type FullSpecification = Prisma.SpecificationGetPayload<{
  include: { material: { include: { consumed_materials: true } } };
}>;

interface HasCreatedAt {
  createdAt: Date;
}

const summaryInclude = {
  batch: true,
  notes: true,
  statuses: {
    include: {
      operation: { include: { min_rank: true } },
      maintenance_session: { include: { maintenance: true } },
      post: true,
    },
    orderBy: { id: "asc" as const },
  },
  product: {
    include: {
      tresholds: {
        orderBy: { createdAt: "desc" as const },
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
  constructor(
    private prisma: PrismaService,
    private dataService: DataService,
    private mutationService: MutationService,
    private chartDataService: ChartDataService,
  ) {}

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

  async updateSummary(dto: UpdateSummaryDto) {
    return this.mutationService.updateSummary(dto);
  }

  async deleteSummary(id: number) {
    await this.prisma.summary.delete({ where: { id: id } });
  }

  async getSummariesList(query: GetSummariesListDto) {
    return this.dataService.getSummariesList(query);
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

    return Number(aggregate._sum.idle_time ?? 0n);
  }

  private mapMaterialsByPost(
    specs: FullSpecification[],
    currentSummaryId: number,
    postNumber: number,
  ): IMappedMaterial[] {
    return specs
      .filter((s) => s.material.post_number === postNumber)
      .map(({ material }) => {
        const hasBeenScannedInThisSummary = material.consumed_materials.some(
          (cm) =>
            cm.summary_id === currentSummaryId &&
            cm.material_id === material.id,
        );
        return {
          code: material.code,
          name: material.name,
          scanned: hasBeenScannedInThisSummary,
        };
      });
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

    const [
      allOperations,
      allMaintenances,
      allMaintenanceSessions,
      idleTimesRaw,
    ] = await Promise.all([
      this.prisma.operation.findMany({
        where: { isInactive: false },
        include: { post: true, min_rank: true },
        orderBy: { id: "asc" },
      }),
      this.prisma.maintenance.findMany({
        include: { post: true, min_rank: true, tasks: true },
        orderBy: { id: "asc" },
      }),
      this.prisma.maintenanceSession.findMany({
        where: {
          end_time: null,
          statuses: {
            some: {
              summary_id: activeRecord.id,
            },
          },
        },
        include: {
          post: true,
          maintenance: true,
          maintenance_logs: { include: { task: true }, orderBy: { id: "asc" } },
        },
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
              last.operation?.description ??
              last.maintenance_session?.maintenance?.description ??
              "Нет описания",
            createdAt: last.createdAt,
            operation_id: last.operation_id,
            maintenance_session_id: last.maintenance_session_id,
          }
        : {
            idle: false,
            finished: false,
            state: "working",
            operation_description: "-",
            createdAt: null,
            operation_id: null,
            maintenance_session_id: null,
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

    const flatMaints = allMaintenances.map((m) => ({
      id: m.id,
      value: m.value,
      description: m.description,
      min_rank: m.min_rank?.val ?? 0,
      post_value: m.post?.value,
      task_count: m.tasks?.length ?? 0,
    }));

    const flatMaintSessions = allMaintenanceSessions.map((s) => ({
      id: s.id,
      maintenance_value: s.maintenance?.value,
      maintenance_description: s.maintenance?.description,
      start_time: s.start_time,
      end_time: s.end_time,
      post_value: s.post?.value,
      maintenance_logs: s.maintenance_logs.map((l) => ({
        id: l.id,
        title: l.title,
        start_time: l.start_time,
        end_time: l.end_time,
        is_done: l.is_done,
        order: l.task.order,
      })),
    }));

    const notesMap = activeRecord.notes.reduce(
      (acc, n) => ({ ...acc, [n.post_id]: n.note }),
      {} as Record<number, string>,
    );
    const tresholds =
      activeRecord.product.tresholds.find(
        (x) => x.conveyor_id === conveyor_id,
      ) ?? null;
    return {
      data: mappedSummary({
        summary: activeRecord,
        batch: activeRecord.batch,
        product: activeRecord.product,
      }),
      // tresholds: activeRecord.product.tresholds[0] ?? null,
      tresholds: tresholds,

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
      extrusionMaintenances: flatMaints.filter((m) => m.post_value === 1),
      extrusionMaintenanceSession:
        flatMaintSessions.find((m) => m.post_value === 1) || null,

      varnishStatus: varn.current,
      varnishStatusCounters: varn.counters,
      varnishOperations: flatOps.filter((o) => o.post_value === 2),
      varnishMaintenances: flatMaints.filter((m) => m.post_value === 2),
      varnishMaintenanceSession:
        flatMaintSessions.find((m) => m.post_value === 2) || null,

      offsetStatus: off.current,
      offsetStatusCounters: off.counters,
      offsetOperations: flatOps.filter((o) => o.post_value === 3),
      offsetMaintenances: flatMaints.filter((m) => m.post_value === 3),
      offsetMaintenanceSession:
        flatMaintSessions.find((m) => m.post_value === 3) || null,

      sealantStatus: seal.current,
      sealantStatusCounters: seal.counters,
      sealantOperations: flatOps.filter((o) => o.post_value === 4),
      sealantMaintenances: flatMaints.filter((m) => m.post_value === 4),
      sealantMaintenanceSession:
        flatMaintSessions.find((m) => m.post_value === 4) || null,

      extrusion_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        activeRecord.id,
        1,
      ),
      varnish_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        activeRecord.id,
        2,
      ),
      offset_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        activeRecord.id,
        3,
      ),
      sealant_materials: this.mapMaterialsByPost(
        activeRecord.specifications,
        activeRecord.id,
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
    return this.mutationService.finishSummary(dto);
  }

  async startSummary(dto: StartSummaryDto) {
    return this.mutationService.startSummary(dto);
  }

  async getSummaryById(id: number) {
    return this.dataService.getSummaryById(id);
  }

  async getPostStatuses(query: GetPostStatusesDto) {
    const statuses = await this.prisma.status.findMany({
      where: {
        summary_id: query.summary_id,
        post: query.post_val ? { value: query.post_val } : undefined,
      },
      include: {
        operation: true,
        employee: true,
        post: true,
        maintenance_session: { include: { maintenance: true } },
      },
      orderBy: [{ createdAt: "asc" }],
    });
    return { statuses };
  }

  async getPostStatusesWithData(query: GetStatusesDto) {
    const [summary, statuses] = await Promise.all([
      this.prisma.summary.findUnique({
        where: { id: query.summary_id },
        include: { conveyor: true, batch: true, product: true },
      }),
      this.prisma.status.findMany({
        where: {
          summary_id: query.summary_id,
        },
        include: {
          operation: true,
          employee: true,
          post: true,
          maintenance_session: { include: { maintenance: true } },
        },
        orderBy: [{ createdAt: "asc" }],
      }),
    ]);

    return { summary, statuses };
  }

  async getSummaryDetail(id: number) {
    const summary = await this.prisma.summary.findUnique({
      where: { id: id },
      include: { conveyor: true, batch: true, product: true },
    });

    if (!summary)
      throw new HttpException("Сводка не найдена", HttpStatus.NOT_FOUND);

    const [
      thresholds,
      statuses,
      defects,
      consumed_materials,
      extrusion,
      varnish,
      offset,
      sealant,
    ] = await Promise.all([
      this.prisma.treshold.findMany({
        where: {
          conveyor_id: summary.conveyor_id,
          product_id: summary.product_id,
        },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.status.findMany({
        where: { summary_id: id },
        include: { operation: true, employee: true, post: true },
        orderBy: { createdAt: "asc" },
      }),
      this.prisma.defect.findMany({
        where: { summary_id: id },
        include: { post: true },
      }),
      this.prisma.consumedMaterial.findMany({
        where: { summary_id: id },
        include: { material: true, lot: true },
      }),
      this.prisma.extrusionParam.findMany({
        where: { summary_id: id },
        include: { employee: true },
        orderBy: { createdAt: "asc" },
      }),
      this.prisma.varnishParam.findMany({
        where: { summary_id: id },
        include: { employee: true },
        orderBy: { createdAt: "asc" },
      }),
      this.prisma.offsetParam.findMany({
        where: { summary_id: id },
        include: { employee: true },
        orderBy: { createdAt: "asc" },
      }),
      this.prisma.sealantParam.findMany({
        where: { summary_id: id },
        include: { employee: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    function withActualThreshold<T extends HasCreatedAt>(
      record: T,
      allTresholds: Treshold[],
    ) {
      const treshold =
        allTresholds.find((t) => t.createdAt <= record.createdAt) || null;
      return {
        ...record,
        treshold,
      };
    }

    return {
      summary,
      statuses,
      defects,
      consumed_materials,
      tresholds: thresholds[0] ?? null,
      extrusionParams: extrusion.map((p) => withActualThreshold(p, thresholds)),
      varnishParams: varnish.map((p) => withActualThreshold(p, thresholds)),
      offsetParams: offset.map((p) => withActualThreshold(p, thresholds)),
      sealantParams: sealant.map((p) => withActualThreshold(p, thresholds)),
    };
  }

  async getSummaryDefectsList(query: GetSummariesListDto) {
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
    };

    const [count, summaries, defectsGroupByProduct, productionAgg, planAgg] =
      await Promise.all([
        this.prisma.summary.count({ where }),
        this.prisma.summary.findMany({
          where,
          include: {
            product: {
              include: { unit_weight: { take: 1, orderBy: [{ id: "desc" }] } },
            },
            batch: true,
            conveyor: true,
            statuses: {
              select: { counter_value: true },
              where: { finished: true, post: { value: 4 } },
              take: 1,
              orderBy: [{ id: "desc" }],
            },
            defects: {
              where: {
                post: {
                  value: { in: [1, 2, 3, 4] },
                  // value: { in: [2, 3, 4] },
                },
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

        this.prisma.defect.groupBy({
          by: ["summary_id"],
          where: {
            summary: where,
            post: { value: { in: [1, 2, 3, 4] } },
            // post: { value: { in: [2, 3, 4] } },
          },
          _sum: { value: true },
        }),
        this.prisma.status.aggregate({
          where: { summary: where, finished: true, post: { value: 4 } },
          _sum: { counter_value: true },
        }),
        this.prisma.summary.aggregate({
          where: { ...where, isFinished: true },
          _sum: { plan: true },
        }),
      ]);

    const rows = summaries.map((summary) => {
      const totalDefects =
        Math.round(
          summary.defects.reduce((sum, d) => sum + (d.value || 0), 0) * 100,
        ) / 100;
      const unitWeight = summary.product.unit_weight?.[0]?.weight ?? null;
      const production = summary.statuses?.[0]?.counter_value ?? null;
      const defectsInUnits = unitWeight
        ? Math.round(totalDefects / unitWeight)
        : null;
      const defectPercent =
        production && defectsInUnits
          ? Math.round((defectsInUnits / production) * 100 * 100) / 100
          : null;
      const execution = production
        ? Math.round((production / summary.plan) * 100 * 100) / 100
        : null;
      const {
        defects: _defects,
        statuses: _statuses,
        product,
        batch,
        conveyor: _conveyor,
        ...rest
      } = summary;
      return {
        ...rest,
        batch_name: batch.name,
        product_code: product.code,
        product_marking: product.marking,
        product_name: product.name,
        product_weight: unitWeight,
        conveyor_name: summary.conveyor.name,
        totalDefects,
        production,
        execution,
        defectsInUnits,
        defectPercent,
      };
    });

    const summaryIds = defectsGroupByProduct.map((d) => d.summary_id);
    const summaryWeights = await this.prisma.summary.findMany({
      where: { id: { in: summaryIds } },
      select: {
        id: true,
        product: {
          select: { unit_weight: { take: 1, orderBy: { id: "desc" } } },
        },
      },
    });

    let totalGlobalUnits = 0;
    let totalGlobalWeight = 0;

    defectsGroupByProduct.forEach((def) => {
      const sWeight = summaryWeights.find((s) => s.id === def.summary_id)
        ?.product.unit_weight[0]?.weight;
      const weightSum = def._sum.value || 0;
      totalGlobalWeight += weightSum;
      if (sWeight && sWeight > 0) {
        totalGlobalUnits += Math.round(weightSum / sWeight);
      }
    });

    const globalProduction = productionAgg._sum.counter_value || 0;
    const globalPlan = planAgg._sum.plan || 0;
    const globalExecution =
      globalPlan > 0
        ? Math.round((globalProduction / globalPlan) * 100 * 100) / 100
        : 0;
    const globalPercent =
      globalProduction > 0
        ? Math.round((totalGlobalUnits / globalProduction) * 10000) / 100
        : 0;

    return {
      total: count,
      rows: rows,
      aggregates: {
        total_defect_weight: Math.round(totalGlobalWeight * 100) / 100,
        total_defect_units: totalGlobalUnits,
        total_production: globalProduction,
        total_defect_percent: globalPercent,
        total_execution: globalExecution,
      },
    };
  }

  async getSummaryChartData(query: GetCrewsStatsDto) {
    return this.chartDataService.getSummaryChartData(query);
  }
}
