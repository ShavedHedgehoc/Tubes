import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaDb, PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import {
  IMappedExtrusionParams,
  IMappedOffsetParams,
  IMappedSealantParams,
  IMappedVarnishParams,
  mapParams,
  mappedStatus,
  mappedSummary,
  // mappedSummaryReportData,
} from "./mapper";
import { CreateSummaryDto } from "./dto/create-summary.dto";
import { parseAssemblies, parsedAssembly } from "src/helpers/parse-assemblies";
import { ChangeSummaryStateDto } from "./dto/change-summary-state.dto";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import { Prisma } from "generated/prisma";
import {
  ActiveSummaryResponse,
  BaseStatus,
} from "./dto/active-summary.response";
import { AvailableSummariesResponse } from "./dto/available-summaries.response";

type StatusTable =
  | "extrusionStatus"
  | "varnishStatus"
  | "offsetStatus"
  | "sealantStatus";
type FullSpecification = Prisma.SpecificationGetPayload<{
  include: { material: { include: { consumed_materials: true } } };
}>;
type AggregateResult = { _sum: { idle_time: number | null } } | null;

export interface IIdleTimeAggregate {
  _sum: {
    idle_time: number | null;
  };
}

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
              extrusion_statuses: true,
              varnish_statuses: true,
              offset_statuses: true,
              sealant_statuses: true,
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
    table: StatusTable,
    params: { createdAt: Date } | null | undefined,
  ): Promise<IIdleTimeAggregate | null> {
    if (!params) return null;

    const db = this.prisma as unknown as Record<
      StatusTable,
      { aggregate: (args: any) => Promise<IIdleTimeAggregate> }
    >;

    return db[table].aggregate({
      _sum: { idle_time: true },
      where: {
        idle_time: { not: null },
        createdAt: { gt: params.createdAt },
      },
    });
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
    const activeRecord = await this.prisma.summary.findFirst({
      where: { conveyor_id: conveyor_id, isActive: true },
      include: {
        batch: true,
        notes: true,
        extrusion_defects: true,
        extrusion_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },
        varnish_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },
        offset_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },
        sealant_statuses: {
          include: {
            operation: true,
          },
          orderBy: { id: "desc" },
          take: 1,
        },

        product: {
          include: {
            tresholds: {
              where: { conveyor_id: conveyor_id },
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        },
        extrusion_params: {
          orderBy: { id: "desc" },
        },
        varnish_params: {
          orderBy: { id: "desc" },
        },
        offset_params: {
          orderBy: { id: "desc" },
        },
        sealant_params: {
          orderBy: { id: "desc" },
        },
        specifications: {
          include: {
            material: {
              include: {
                consumed_materials: {
                  where: {
                    summary: { conveyor_id: conveyor_id, isActive: true },
                  },
                  orderBy: { id: "desc" },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!activeRecord)
      throw new HttpException(
        "Активная сводка не найдена",
        HttpStatus.NOT_FOUND,
      );

    const data = mappedSummary({
      summary: activeRecord,
      batch: activeRecord.batch,
      product: activeRecord.product,
    });

    const [firstExtrusion = null] = activeRecord.extrusion_params;
    const [firstVarnish = null] = activeRecord.varnish_params;
    const [firstOffset = null] = activeRecord.offset_params;
    const [firstSealant = null] = activeRecord.sealant_params;

    const extrusionParams = mapParams<IMappedExtrusionParams>(firstExtrusion);
    const varnishParams = mapParams<IMappedVarnishParams>(firstVarnish);
    const offsetParams = mapParams<IMappedOffsetParams>(firstOffset);
    const sealantParams = mapParams<IMappedSealantParams>(firstSealant);

    const [statuses, operations, idleTimesRaw] = await Promise.all([
      // Статусы
      Promise.all([
        this.prisma.extrusionStatus.findMany({
          where: { summary_id: activeRecord.id },
        }),
        this.prisma.varnishStatus.findMany({
          where: { summary_id: activeRecord.id },
        }),
        this.prisma.offsetStatus.findMany({
          where: { summary_id: activeRecord.id },
        }),
        this.prisma.sealantStatus.findMany({
          where: { summary_id: activeRecord.id },
        }),
      ]),
      // Операции
      Promise.all([
        this.prisma.extrusionOperation.findMany({ orderBy: { id: "asc" } }),
        this.prisma.varnishOperation.findMany({ orderBy: { id: "asc" } }),
        this.prisma.offsetOperation.findMany({ orderBy: { id: "asc" } }),
        this.prisma.sealantOperation.findMany({ orderBy: { id: "asc" } }),
      ]),
      // Агрегации времени (запускаем только если есть параметры)
      Promise.all([
        this.getIdleTimeSum("extrusionStatus", extrusionParams),
        this.getIdleTimeSum("varnishStatus", varnishParams),
        this.getIdleTimeSum("offsetStatus", offsetParams),
        this.getIdleTimeSum("sealantStatus", sealantParams),
      ]),
    ]);

    const idleTimes = idleTimesRaw as AggregateResult[];
    // const extrusion_defects = activeRecord.extrusion_defects[0]?.value ?? null;

    const notesMap = activeRecord.notes.reduce(
      (acc, curr) => {
        acc[curr.post_id] = curr.note;
        return acc;
      },
      {} as Record<number, string>,
    );

    const getStatusData = (statuses: BaseStatus[]) => {
      const [first = null] = statuses;
      return {
        status: first,
        operation: first?.operation ?? null,
      };
    };

    const extrusionStatus = mappedStatus(
      getStatusData(activeRecord.extrusion_statuses),
    );
    const varnishStatus = mappedStatus(
      getStatusData(activeRecord.varnish_statuses),
    );
    const offsetStatus = mappedStatus(
      getStatusData(activeRecord.offset_statuses),
    );
    const sealantStatus = mappedStatus(
      getStatusData(activeRecord.sealant_statuses),
    );

    return {
      data: data,
      // materials: activeRecord.specifications ?? null,
      tresholds: activeRecord.product.tresholds[0] ?? null,
      extrusionParams: extrusionParams,
      varnishParams: varnishParams,
      offsetParams: offsetParams,
      sealantParams: sealantParams,
      extrusionStatusCounters: statuses[0] ?? 0,
      varnishStatusCounters: statuses[1] ?? 0,
      offsetStatusCounters: statuses[2] ?? 0,
      sealantStatusCounters: statuses[3] ?? 0,
      extrusion_note: notesMap[1] ?? null,
      varnish_note: notesMap[1] ?? null,
      offset_note: notesMap[1] ?? null,
      sealant_note: notesMap[1] ?? null,
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
      extrusionStatus: extrusionStatus,
      varnishStatus: varnishStatus,
      offsetStatus: offsetStatus,
      sealantStatus: sealantStatus,
      extrusionOperations: operations[0] ?? null,
      varnishOperations: operations[1] ?? null,
      offsetOperations: operations[2] ?? null,
      sealantOperations: operations[3] ?? null,
      extrusionIdleTime: idleTimes[0]?._sum?.idle_time ?? 0,
      varnishIdleTime: idleTimes[1]?._sum?.idle_time ?? 0,
      offsetIdleTime: idleTimes[2]?._sum?.idle_time ?? 0,
      sealantIdleTime: idleTimes[3]?._sum?.idle_time ?? 0,
      // extrusionDefects: extrusion_defects,
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

  // private async getConsumedMaterial({ id, date }: { id: number; date: Date }) {
  //   const record = await this.prisma.consumedMaterial.findFirst({
  //     where: {
  //       material_id: id,
  //       createdAt: { lte: date },
  //     },
  //     include: { lot: true, material: true },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });
  //   if (!record)
  //     throw new HttpException(
  //       `Запись о расходе материала (ID: ${id}) не найдена`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   return {
  //     code: record.material.code,
  //     name: record.material.name,
  //     lot: record.lot.value,
  //   };
  // }

  // private async getPostSpecification({
  //   summary_id,
  //   post_number,
  // }: {
  //   summary_id: number;
  //   post_number: number;
  // }) {
  //   return await this.prisma.specification.findMany({
  //     select: { material_id: true },
  //     where: { summary_id: summary_id, material: { post_number: post_number } },
  //   });
  // }

  // async getSummaryById(id: number) {
  //   const record = await this.prisma.summary.findUnique({
  //     where: { id: id },
  //     include: {
  //       batch: true,
  //       product: true,
  //       conveyor: true,
  //     },
  //   });

  //   if (!record)
  //     throw new HttpException(
  //       "Активная сводка не найдена",
  //       HttpStatus.NOT_FOUND,
  //     );

  //   const data = mappedSummaryReportData({
  //     summary: record,
  //     batch: record.batch,
  //     product: record.product,
  //     conveyor: record.conveyor,
  //   });

  //   const extrusionSpecification = await this.getPostSpecification({
  //     summary_id: record.id,
  //     post_number: 1,
  //   });
  //   const varnishSpecification = await this.getPostSpecification({
  //     summary_id: record.id,
  //     post_number: 2,
  //   });
  //   const offsetSpecification = await this.getPostSpecification({
  //     summary_id: record.id,
  //     post_number: 3,
  //   });
  //   const sealantSpecification = await this.getPostSpecification({
  //     summary_id: record.id,
  //     post_number: 4,
  //   });

  //   const extrusionParams = await this.prisma.extrusionParam.findMany({
  //     where: { summary_id: record.id },
  //     include: { employee: true },
  //   });

  //   const varnishParams = await this.prisma.varnishParam.findMany({
  //     where: { summary_id: record.id },
  //     include: { employee: true },
  //   });

  //   const offsetParams = await this.prisma.offsetParam.findMany({
  //     where: { summary_id: record.id },
  //     include: { employee: true },
  //   });

  //   const sealantParams = await this.prisma.sealantParam.findMany({
  //     where: { summary_id: record.id },
  //     include: { employee: true },
  //   });

  //   const extrusionParamsResult = await Promise.all(
  //     await extrusionParams.map(async (item) => {
  //       return {
  //         id: item.id,
  //         summary_id: item.summary_id,
  //         counter_value: item.counter_value,
  //         press_speed: item.press_speed,
  //         blow_time: item.blow_time,
  //         turning_machine_speed: item.turning_machine_speed,
  //         annealing_furnace_temp: item.annealing_furnace_temp,
  //         tube_cylindrical_section_length: item.tube_cylindrical_section_length,
  //         membrane_thickness: item.membrane_thickness,
  //         tube_diameter: item.tube_diameter,
  //         tube_cylindrical_section_thickness:
  //           item.tube_cylindrical_section_thickness,
  //         tube_rigidity: item.tube_rigidity,
  //         tube_cutting_quality: item.tube_cutting_quality,
  //         tightness: item.tightness,
  //         external_thread_quality: item.external_thread_quality,
  //         employee: item.employee ? item.employee.name : null,
  //         createdAt: item.createdAt,
  //         consumed_materials: extrusionSpecification.length
  //           ? await Promise.all(
  //             extrusionSpecification.map(
  //               async (it) =>
  //                 await this.getConsumedMaterial({
  //                   id: it.material_id,
  //                   date: item.createdAt,
  //                 }),
  //             ),
  //           )
  //           : [],
  //       };
  //     }),
  //   );

  //   const varnishParamsResult = await Promise.all(
  //     await varnishParams.map(async (item) => {
  //       return {
  //         id: item.id,
  //         summary_id: item.summary_id,
  //         counter_value: item.counter_value,
  //         varnish_machine_speed: item.varnish_machine_speed,
  //         total_air_pressure: item.total_air_pressure,
  //         feed_can_air_pressure: item.feed_can_air_pressure,
  //         nozzle_regulator_air_pressure: item.nozzle_regulator_air_pressure,
  //         cells_speed: item.cells_speed,
  //         injection_a_start_position: item.injection_a_start_position,
  //         injection_b_start_position: item.injection_b_start_position,
  //         injection_c_start_position: item.injection_c_start_position,
  //         injection_d_start_position: item.injection_d_start_position,
  //         injection_a_end_position: item.injection_a_end_position,
  //         injection_b_end_position: item.injection_b_end_position,
  //         injection_c_end_position: item.injection_c_end_position,
  //         injection_d_end_position: item.injection_d_end_position,
  //         tube_molding_start_position: item.tube_molding_start_position,
  //         tube_molding_end_position: item.tube_molding_end_position,
  //         polimerization_furnace_temp: item.polimerization_furnace_temp,
  //         internal_varnish_porosity: item.internal_varnish_porosity,
  //         internal_sectional_view: item.internal_sectional_view,
  //         aluminium_clearance_lack: item.aluminium_clearance_lack,
  //         unpainting_lack: item.unpainting_lack,
  //         employee: item.employee ? item.employee.name : null,
  //         createdAt: item.createdAt,
  //         consumed_materials: varnishSpecification.length
  //           ? await Promise.all(
  //             varnishSpecification.map(
  //               async (it) =>
  //                 await this.getConsumedMaterial({
  //                   id: it.material_id,
  //                   date: item.createdAt,
  //                 }),
  //             ),
  //           )
  //           : [],
  //       };
  //     }),
  //   );

  //   const offsetParamsResult = await Promise.all(
  //     await offsetParams.map(async (item) => {
  //       return {
  //         id: item.id,
  //         summary_id: item.summary_id,
  //         counter_value: item.counter_value,
  //         printing_machine_speed: item.printing_machine_speed,
  //         total_air_pressure: item.total_air_pressure,
  //         padding_furnace_temp: item.padding_furnace_temp,
  //         offset_furnace_temp: item.offset_furnace_temp,
  //         printer_motor: item.printer_motor,
  //         base_covers_holders_motor: item.base_covers_holders_motor,
  //         base_covers_station_motor: item.base_covers_station_motor,
  //         imprint_quantity_printed_box_1: item.imprint_quantity_printed_box_1
  //           ? item.imprint_quantity_printed_box_1
  //           : null,
  //         imprint_quantity_printed_box_2: item.imprint_quantity_printed_box_2
  //           ? item.imprint_quantity_printed_box_2
  //           : null,
  //         imprint_quantity_printed_box_3: item.imprint_quantity_printed_box_3
  //           ? item.imprint_quantity_printed_box_3
  //           : null,
  //         imprint_quantity_printed_box_4: item.imprint_quantity_printed_box_4
  //           ? item.imprint_quantity_printed_box_4
  //           : null,
  //         imprint_quantity_printed_box_5: item.imprint_quantity_printed_box_5
  //           ? item.imprint_quantity_printed_box_5
  //           : null,
  //         imprint_quantity_printed_box_6: item.imprint_quantity_printed_box_6
  //           ? item.imprint_quantity_printed_box_6
  //           : null,
  //         ink_supply_time: item.ink_supply_time,
  //         design_match: item.design_match,
  //         tube_appearance: item.tube_appearance,
  //         tube_edge_deformation_lack: item.tube_edge_deformation_lack,
  //         aluminium_clearance_lack: item.aluminium_clearance_lack,
  //         drips_lack: item.drips_lack,

  //         employee: item.employee ? item.employee.name : null,
  //         createdAt: item.createdAt,
  //         consumed_materials: offsetSpecification.length
  //           ? await Promise.all(
  //             offsetSpecification.map(
  //               async (it) =>
  //                 await this.getConsumedMaterial({
  //                   id: it.material_id,
  //                   date: item.createdAt,
  //                 }),
  //             ),
  //           )
  //           : [],
  //       };
  //     }),
  //   );

  //   const sealantParamsResult = await Promise.all(
  //     await sealantParams.map(async (item) => {
  //       return {
  //         id: item.id,
  //         summary_id: item.summary_id,
  //         counter_value: item.counter_value,
  //         cap_machine_speed: item.cap_machine_speed,
  //         total_air_pressure: item.total_air_pressure,
  //         holders_forward: item.holders_forward,
  //         holders_opening_left: item.holders_opening_left,
  //         holders_opening_right: item.holders_opening_right,
  //         holders_closing: item.holders_closing,
  //         injection_a_start: item.injection_a_start,
  //         injection_b_start: item.injection_b_start,
  //         injection_a_end: item.injection_a_end,
  //         injection_b_end: item.injection_b_end,
  //         injection_tube_orientation_start:
  //           item.injection_tube_orientation_start,
  //         injection_tube_orientation_end: item.injection_tube_orientation_end,
  //         is_cap_surface_smooth: item.is_cap_surface_smooth,
  //         latex_ring_padding: item.latex_ring_padding,
  //         latex_ring_width: item.latex_ring_width,
  //         tube_rigidity: item.tube_rigidity,
  //         cap_unscrewing_torque: item.cap_unscrewing_torque,
  //         employee: item.employee ? item.employee.name : null,
  //         createdAt: item.createdAt,
  //         consumed_materials: sealantSpecification.length
  //           ? await Promise.all(
  //             sealantSpecification.map(
  //               async (it) =>
  //                 await this.getConsumedMaterial({
  //                   id: it.material_id,
  //                   date: item.createdAt,
  //                 }),
  //             ),
  //           )
  //           : [],
  //       };
  //     }),
  //   );

  //   const extrusionOperations = await this.prisma.extrusionStatus.findMany({
  //     where: { summary_id: record.id, idle: true },
  //     include: { employee: true, operation: true },
  //   });
  //   const varnishOperations = await this.prisma.varnishStatus.findMany({
  //     where: { summary_id: record.id, idle: true },
  //     include: { employee: true, operation: true },
  //   });
  //   const offsetOperations = await this.prisma.offsetStatus.findMany({
  //     where: { summary_id: record.id, idle: true },
  //     include: { employee: true, operation: true },
  //   });
  //   const sealantOperations = await this.prisma.sealantStatus.findMany({
  //     where: { summary_id: record.id, idle: true },
  //     include: { employee: true, operation: true },
  //   });

  //   const extrusionStatus = await this.prisma.extrusionStatus.findFirst({
  //     where: { summary_id: record.id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });
  //   const varnishStatus = await this.prisma.varnishStatus.findFirst({
  //     where: { summary_id: record.id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });
  //   const offsetStatus = await this.prisma.offsetStatus.findFirst({
  //     where: { summary_id: record.id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });
  //   const sealantStatus = await this.prisma.sealantStatus.findFirst({
  //     where: { summary_id: record.id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });

  //   const extrusionOperationsResult = await Promise.all(
  //     await extrusionOperations.map(async (item) => {
  //       return {
  //         id: item.id,
  //         counter_value: item.counter_value,
  //         idle_time: item.idle_time,
  //         createdAt: item.createdAt,
  //         employee: item.employee ? item.employee.name : null,
  //         operation_value: item.operation ? item.operation.value : null,
  //         operation_description: item.operation
  //           ? item.operation.description
  //           : null,
  //       };
  //     }),
  //   );

  //   const varnishOperationsResult = await Promise.all(
  //     await varnishOperations.map(async (item) => {
  //       return {
  //         id: item.id,
  //         counter_value: item.counter_value,
  //         idle_time: item.idle_time,
  //         createdAt: item.createdAt,
  //         employee: item.employee ? item.employee.name : null,
  //         operation_value: item.operation ? item.operation.value : null,
  //         operation_description: item.operation
  //           ? item.operation.description
  //           : null,
  //       };
  //     }),
  //   );
  //   const offsetOperationsResult = await Promise.all(
  //     await offsetOperations.map(async (item) => {
  //       return {
  //         id: item.id,
  //         counter_value: item.counter_value,
  //         idle_time: item.idle_time,
  //         createdAt: item.createdAt,
  //         employee: item.employee ? item.employee.name : null,
  //         operation_value: item.operation ? item.operation.value : null,
  //         operation_description: item.operation
  //           ? item.operation.description
  //           : null,
  //       };
  //     }),
  //   );
  //   const sealantOperationsResult = await Promise.all(
  //     await sealantOperations.map(async (item) => {
  //       return {
  //         id: item.id,
  //         counter_value: item.counter_value,
  //         idle_time: item.idle_time,
  //         createdAt: item.createdAt,
  //         employee: item.employee ? item.employee.name : null,
  //         operation_value: item.operation ? item.operation.value : null,
  //         operation_description: item.operation
  //           ? item.operation.description
  //           : null,
  //       };
  //     }),
  //   );

  //   const extrusionDefect = await this.prisma.extrusionDefect.findUnique({
  //     where: { summary_id: record.id },
  //   });
  //   const varnishDefect = await this.prisma.varnishDefect.findUnique({
  //     where: { summary_id: record.id },
  //   });
  //   const offsetDefect = await this.prisma.offsetDefect.findUnique({
  //     where: { summary_id: record.id },
  //   });
  //   const sealantDefect = await this.prisma.sealantDefect.findUnique({
  //     where: { summary_id: record.id },
  //   });

  //   const extrusionTresholds = await this.prisma.extrusionTreshold.findMany({
  //     where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });

  //   const varnishTresholds = await this.prisma.varnishTreshold.findMany({
  //     where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });

  //   const offsetTresholds = await this.prisma.offsetTreshold.findMany({
  //     where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });

  //   const sealantTresholds = await this.prisma.sealantTreshold.findMany({
  //     where: { conveyor_id: record.conveyor_id, product_id: record.product_id },
  //     orderBy: { id: "desc" },
  //     take: 1,
  //   });

  //   return {
  //     data: data,
  //     extrusion: {
  //       params: extrusionParamsResult.length ? extrusionParamsResult : [],
  //       tresholds: extrusionTresholds.length ? extrusionTresholds[0] : null,
  //       operations: extrusionOperationsResult.length
  //         ? extrusionOperationsResult
  //         : [],
  //       defect: extrusionDefect ? extrusionDefect.value : null,
  //       status: extrusionStatus
  //         ? extrusionStatus.finished === true
  //           ? "finished"
  //           : extrusionStatus.idle === true
  //             ? "idle"
  //             : "working"
  //         : null,
  //     },
  //     varnish: {
  //       params: varnishParamsResult.length ? varnishParamsResult : [],
  //       tresholds: varnishTresholds.length ? varnishTresholds[0] : null,
  //       operations: varnishOperationsResult.length
  //         ? varnishOperationsResult
  //         : [],
  //       defect: varnishDefect ? varnishDefect.value : null,
  //       status: varnishStatus
  //         ? varnishStatus.finished === true
  //           ? "finished"
  //           : varnishStatus.idle === true
  //             ? "idle"
  //             : "working"
  //         : null,
  //     },
  //     offset: {
  //       params: offsetParamsResult.length ? offsetParamsResult : [],
  //       tresholds: offsetTresholds.length ? offsetTresholds[0] : null,
  //       operations: offsetOperationsResult.length ? offsetOperationsResult : [],
  //       defect: offsetDefect ? offsetDefect.value : null,
  //       status: offsetStatus
  //         ? offsetStatus.finished === true
  //           ? "finished"
  //           : offsetStatus.idle === true
  //             ? "idle"
  //             : "working"
  //         : null,
  //     },
  //     sealant: {
  //       params: sealantParamsResult.length ? sealantParamsResult : [],
  //       tresholds: sealantTresholds.length ? sealantTresholds[0] : null,
  //       operations: sealantOperationsResult.length
  //         ? sealantOperationsResult
  //         : [],
  //       defect: sealantDefect ? sealantDefect.value : null,
  //       status: sealantStatus
  //         ? sealantStatus.finished === true
  //           ? "finished"
  //           : sealantStatus.idle === true
  //             ? "idle"
  //             : "working"
  //         : null,
  //     },
  //   };
  // }
}
