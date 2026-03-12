import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStatusDto } from "./dto/create-status.dto";
import { ApiMessages } from "src/resources/api-messages";

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async createExtrusionStatus(dto: CreateStatusDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastStatusEntry = await tx.extrusionStatus.findFirst({
        orderBy: {
          id: "desc",
        },
      });

      if (!lastStatusEntry) {
        if (dto.idle) {
          return await tx.extrusionStatus.create({
            data: {
              summary_id: dto.summary_id,
              operation_id: dto.operation_id,
              idle: dto.idle,
              finished: dto.finished,
              employee_id: dto.employee_id,
              counter_value: 0,
            },
          });
        }
        throw new HttpException(
          ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (lastStatusEntry.idle) {
        const timeDelta = Date.now() - lastStatusEntry.createdAt.getTime();
        await tx.extrusionStatus.update({
          where: { id: lastStatusEntry.id },
          data: { idle_time: timeDelta },
        });
      }
      if (dto.defect_value) {
        await tx.extrusionDefect.upsert({
          where: { summary_id: dto.summary_id },
          update: { value: Number(dto.defect_value) },
          create: {
            summary_id: dto.summary_id,
            value: Number(dto.defect_value),
          },
        });
      }
      return await tx.extrusionStatus.create({
        data: {
          summary_id: dto.summary_id,
          operation_id: dto.operation_id,
          idle: dto.idle,
          finished: dto.finished,
          employee_id: dto.employee_id,
          counter_value: lastStatusEntry.counter_value,
        },
      });
    });
  }

  async createVarnishStatus(dto: CreateStatusDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastStatusEntry = await tx.varnishStatus.findFirst({
        orderBy: {
          id: "desc",
        },
      });

      if (!lastStatusEntry) {
        if (dto.idle) {
          return await tx.varnishStatus.create({
            data: {
              summary_id: dto.summary_id,
              operation_id: dto.operation_id,
              idle: dto.idle,
              finished: dto.finished,
              employee_id: dto.employee_id,
              counter_value: 0,
            },
          });
        }
        throw new HttpException(
          ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (lastStatusEntry.idle) {
        const timeDelta = Date.now() - lastStatusEntry.createdAt.getTime();
        await tx.varnishStatus.update({
          where: { id: lastStatusEntry.id },
          data: { idle_time: timeDelta },
        });
      }
      if (dto.defect_value) {
        await tx.varnishDefect.upsert({
          where: { summary_id: dto.summary_id },
          update: { value: Number(dto.defect_value) },
          create: {
            summary_id: dto.summary_id,
            value: Number(dto.defect_value),
          },
        });
      }
      return await tx.varnishStatus.create({
        data: {
          summary_id: dto.summary_id,
          operation_id: dto.operation_id,
          idle: dto.idle,
          finished: dto.finished,
          employee_id: dto.employee_id,
          counter_value: lastStatusEntry.counter_value,
        },
      });
    });
  }

  async createOffsetStatus(dto: CreateStatusDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastStatusEntry = await tx.offsetStatus.findFirst({
        orderBy: {
          id: "desc",
        },
      });

      if (!lastStatusEntry) {
        if (dto.idle) {
          return await tx.offsetStatus.create({
            data: {
              summary_id: dto.summary_id,
              operation_id: dto.operation_id,
              idle: dto.idle,
              finished: dto.finished,
              employee_id: dto.employee_id,
              counter_value: 0,
            },
          });
        }
        throw new HttpException(
          ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (lastStatusEntry.idle) {
        const timeDelta = Date.now() - lastStatusEntry.createdAt.getTime();
        await tx.offsetStatus.update({
          where: { id: lastStatusEntry.id },
          data: { idle_time: timeDelta },
        });
      }

      if (dto.defect_value) {
        await tx.offsetDefect.upsert({
          where: { summary_id: dto.summary_id },
          update: { value: Number(dto.defect_value) },
          create: {
            summary_id: dto.summary_id,
            value: Number(dto.defect_value),
          },
        });
      }
      return await tx.offsetStatus.create({
        data: {
          summary_id: dto.summary_id,
          operation_id: dto.operation_id,
          idle: dto.idle,
          finished: dto.finished,
          employee_id: dto.employee_id,
          counter_value: lastStatusEntry.counter_value,
        },
      });
    });
  }

  async createSealantStatus(dto: CreateStatusDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastStatusEntry = await tx.sealantStatus.findFirst({
        orderBy: {
          id: "desc",
        },
      });

      if (!lastStatusEntry) {
        if (dto.idle) {
          return await tx.sealantStatus.create({
            data: {
              summary_id: dto.summary_id,
              operation_id: dto.operation_id,
              idle: dto.idle,
              finished: dto.finished,
              employee_id: dto.employee_id,
              counter_value: 0,
            },
          });
        }
        throw new HttpException(
          ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (lastStatusEntry.idle) {
        const timeDelta = Date.now() - lastStatusEntry.createdAt.getTime();
        await tx.sealantStatus.update({
          where: { id: lastStatusEntry.id },
          data: { idle_time: timeDelta },
        });
      }
      if (dto.defect_value) {
        await tx.sealantDefect.upsert({
          where: { summary_id: dto.summary_id },
          update: { value: Number(dto.defect_value) },
          create: {
            summary_id: dto.summary_id,
            value: Number(dto.defect_value),
          },
        });
      }
      return await tx.sealantStatus.create({
        data: {
          summary_id: dto.summary_id,
          operation_id: dto.operation_id,
          idle: dto.idle,
          finished: dto.finished,
          employee_id: dto.employee_id,
          counter_value: lastStatusEntry.counter_value,
        },
      });
    });
  }

  // async createExtrusionStatus(dto: CreateStatusDto) {
  //   const lastStatusEntry = await this.prisma.extrusionStatus.findFirst({
  //     orderBy: {
  //       id: "desc",
  //     },
  //   });

  //   if (!lastStatusEntry)
  //     throw new HttpException(
  //       ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   if (lastStatusEntry.idle) {
  //     const timeDelta = await (new Date().getTime() -
  //       new Date(lastStatusEntry.createdAt).getTime());
  //     await this.prisma.extrusionStatus.update({
  //       where: {
  //         id: lastStatusEntry.id,
  //       },
  //       data: {
  //         idle_time: timeDelta,
  //       },
  //     });
  //   }

  //   if (dto.defect_value) {
  //     await this.prisma.extrusionDefect.upsert({
  //       where: { summary_id: dto.summary_id },
  //       update: { value: Number(dto.defect_value) },
  //       create: { summary_id: dto.summary_id, value: Number(dto.defect_value) },
  //     });
  //   }

  //   const extrusionEntry = await this.prisma.extrusionStatus.create({
  //     data: {
  //       summary_id: dto.summary_id,
  //       operation_id: dto.operation_id,
  //       idle: dto.idle,
  //       finished: dto.finished,
  //       employee_id: dto.employee_id,
  //       counter_value: lastStatusEntry.counter_value,
  //     },
  //   });

  //   return extrusionEntry;
  // }

  // async createVarnishStatus(dto: CreateStatusDto) {
  //   const lastStatusEntry = await this.prisma.varnishStatus.findFirst({
  //     orderBy: {
  //       id: "desc",
  //     },
  //   });

  //   if (!lastStatusEntry)
  //     throw new HttpException(
  //       ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   if (lastStatusEntry.idle) {
  //     const timeDelta = await (new Date().getTime() -
  //       new Date(lastStatusEntry.createdAt).getTime());

  //     await this.prisma.varnishStatus.update({
  //       where: {
  //         id: lastStatusEntry.id,
  //       },
  //       data: {
  //         idle_time: timeDelta,
  //       },
  //     });
  //   }

  //   if (dto.defect_value) {
  //     await this.prisma.varnishDefect.upsert({
  //       where: { summary_id: dto.summary_id },
  //       update: { value: Number(dto.defect_value) },
  //       create: { summary_id: dto.summary_id, value: Number(dto.defect_value) },
  //     });
  //   }

  //   const varnishEntry = await this.prisma.varnishStatus.create({
  //     data: {
  //       summary_id: dto.summary_id,
  //       operation_id: dto.operation_id,
  //       idle: dto.idle,
  //       finished: dto.finished,
  //       employee_id: dto.employee_id,
  //       counter_value: lastStatusEntry.counter_value,
  //     },
  //   });

  //   return varnishEntry;
  // }

  // async createOffsetStatus(dto: CreateStatusDto) {
  //   const lastStatusEntry = await this.prisma.offsetStatus.findFirst({
  //     orderBy: {
  //       id: "desc",
  //     },
  //   });

  //   if (!lastStatusEntry)
  //     throw new HttpException(
  //       ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   if (lastStatusEntry.idle) {
  //     const timeDelta = await (new Date().getTime() -
  //       new Date(lastStatusEntry.createdAt).getTime());
  //     await this.prisma.offsetStatus.update({
  //       where: {
  //         id: lastStatusEntry.id,
  //       },
  //       data: {
  //         idle_time: timeDelta,
  //       },
  //     });
  //   }

  //   if (dto.defect_value) {
  //     await this.prisma.offsetDefect.upsert({
  //       where: { summary_id: dto.summary_id },
  //       update: { value: Number(dto.defect_value) },
  //       create: { summary_id: dto.summary_id, value: Number(dto.defect_value) },
  //     });
  //   }

  //   const offsetEntry = await this.prisma.offsetStatus.create({
  //     data: {
  //       summary_id: dto.summary_id,
  //       operation_id: dto.operation_id,
  //       idle: dto.idle,
  //       finished: dto.finished,
  //       employee_id: dto.employee_id,
  //       counter_value: lastStatusEntry.counter_value,
  //     },
  //   });

  //   return offsetEntry;
  // }

  // async createSealantStatus(dto: CreateStatusDto) {
  //   const lastStatusEntry = await this.prisma.sealantStatus.findFirst({
  //     orderBy: {
  //       id: "desc",
  //     },
  //   });

  //   if (!lastStatusEntry)
  //     throw new HttpException(
  //       ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   if (lastStatusEntry.idle) {
  //     const timeDelta = await (new Date().getTime() -
  //       new Date(lastStatusEntry.createdAt).getTime());
  //     await this.prisma.sealantStatus.update({
  //       where: {
  //         id: lastStatusEntry.id,
  //       },
  //       data: {
  //         idle_time: timeDelta,
  //       },
  //     });
  //   }

  //   if (dto.defect_value) {
  //     await this.prisma.sealantDefect.upsert({
  //       where: { summary_id: dto.summary_id },
  //       update: { value: Number(dto.defect_value) },
  //       create: { summary_id: dto.summary_id, value: Number(dto.defect_value) },
  //     });
  //   }

  //   const sealantEntry = await this.prisma.sealantStatus.create({
  //     data: {
  //       summary_id: dto.summary_id,
  //       operation_id: dto.operation_id,
  //       idle: dto.idle,
  //       finished: dto.finished,
  //       employee_id: dto.employee_id,
  //       counter_value: lastStatusEntry.counter_value,
  //     },
  //   });

  //   return sealantEntry;
  // }
}
