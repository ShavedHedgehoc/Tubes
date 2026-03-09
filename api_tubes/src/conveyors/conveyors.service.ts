import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { mappedConveyors } from "./mapper";
import { Employee } from "generated/prisma";
import { ConveyorsDataResponse } from "./dto/conveyors-data.response";

@Injectable()
export class ConveyorsService {
  constructor(private prisma: PrismaService) {}

  // used in dashboard conveyor service
  async getConveyorByName(name: string) {
    const conveyor = await this.prisma.conveyor.findUnique({
      where: { name: name },
    });
    return conveyor;
  }
  async getConveyorById(id: number) {
    return this.prisma.conveyor.findUnique({ where: { id: id } });
  }
  async getAllConveyors() {
    const conveyors = await this.prisma.conveyor.findMany();
    if (!conveyors) {
      throw new HttpException("Conveyors not found", HttpStatus.NOT_FOUND);
    }
    return conveyors;
  }

  async getConveyorsData(): Promise<ConveyorsDataResponse> {
    const conveyors = await this.prisma.conveyor.findMany({
      include: {
        summaries: {
          where: { isActive: true },
          include: {
            batch: true,
            product: true,
            extrusion_statuses: {
              include: { employee: true },
              orderBy: { id: "desc" },
              take: 1,
            },
            varnish_statuses: {
              include: { employee: true },
              orderBy: { id: "desc" },
              take: 1,
            },
            offset_statuses: {
              include: { employee: true },
              orderBy: { id: "desc" },
              take: 1,
            },
            sealant_statuses: {
              include: { employee: true },
              orderBy: { id: "desc" },
              take: 1,
            },
          },
        },
      },
    });
    return {
      conveyors: conveyors.map((conveyor) => {
        const summary = conveyor.summaries[0] || null;

        // Вспомогательная функция для извлечения статуса и сотрудника
        const getStatusData = <T extends { employee: Employee | null }>(
          statusArray?: T[] | null,
        ) => {
          const lastStatus = statusArray?.[0] ?? null;
          return {
            status: lastStatus,
            employee: lastStatus?.employee ?? null,
          };
        };

        const extrusion = getStatusData(summary?.extrusion_statuses);
        const varnish = getStatusData(summary?.varnish_statuses);
        const offset = getStatusData(summary?.offset_statuses);
        const sealant = getStatusData(summary?.sealant_statuses);

        return mappedConveyors({
          conveyor,
          summary,
          product: summary?.product || null,
          batch: summary?.batch || null,
          extrusion_status: extrusion.status,
          extrusion_employee: extrusion.employee,
          varnish_status: varnish.status,
          varnish_employee: varnish.employee,
          offset_status: offset.status,
          offset_employee: offset.employee,
          sealant_status: sealant.status,
          sealant_employee: sealant.employee,
        });
      }),
    };
    //   conveyors: conveyors.map((item) =>
    //     mappedConveyors({
    //       conveyor: item,
    //       summary: item.summaries.length ? item.summaries[0] : null,
    //       product:
    //         item.summaries.length && item.summaries[0].product
    //           ? item.summaries[0].product
    //           : null,
    //       batch:
    //         item.summaries.length && item.summaries[0].batch
    //           ? item.summaries[0].batch
    //           : null,
    //       extrusion_status:
    //         item.summaries.length && item.summaries[0].extrusion_statuses.length
    //           ? item.summaries[0].extrusion_statuses[0]
    //           : null,
    //       extrusion_employee:
    //         item.summaries.length &&
    //           item.summaries[0].extrusion_statuses.length &&
    //           item.summaries[0].extrusion_statuses[0].employee
    //           ? item.summaries[0].extrusion_statuses[0].employee
    //           : null,
    //       varnish_status:
    //         item.summaries.length && item.summaries[0].varnish_statuses.length
    //           ? item.summaries[0].varnish_statuses[0]
    //           : null,
    //       varnish_employee:
    //         item.summaries.length &&
    //           item.summaries[0].varnish_statuses.length &&
    //           item.summaries[0].varnish_statuses[0].employee
    //           ? item.summaries[0].varnish_statuses[0].employee
    //           : null,
    //       offset_status:
    //         item.summaries.length && item.summaries[0].offset_statuses.length
    //           ? item.summaries[0].offset_statuses[0]
    //           : null,
    //       offset_employee:
    //         item.summaries.length &&
    //           item.summaries[0].offset_statuses.length &&
    //           item.summaries[0].offset_statuses[0].employee
    //           ? item.summaries[0].offset_statuses[0].employee
    //           : null,
    //       sealant_status:
    //         item.summaries.length && item.summaries[0].sealant_statuses.length
    //           ? item.summaries[0].sealant_statuses[0]
    //           : null,
    //       sealant_employee:
    //         item.summaries.length &&
    //           item.summaries[0].sealant_statuses.length &&
    //           item.summaries[0].sealant_statuses[0].employee
    //           ? item.summaries[0].sealant_statuses[0].employee
    //           : null,
    //     }),
    //   ),
    // };
  }
}
