import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import { CreateStatusDto } from "./dto/create-status.dto";

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async createStatus(dto: CreateStatusDto) {
    return await this.prisma.$transaction(async (tx) => {
      const lastStatusEntry = await tx.status.findFirst({
        where: { summary_id: dto.summary_id, post: { value: dto.post_val } },
        orderBy: {
          id: "desc",
        },
      });
      const post = await tx.post.findUnique({
        where: { value: dto.post_val },
      });

      if (!post) {
        throw new HttpException(
          ApiMessages.POST_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!lastStatusEntry) {
        if (dto.idle) {
          return await tx.status.create({
            data: {
              summary_id: dto.summary_id,
              operation_id: dto.operation_id,
              idle: dto.idle,
              finished: dto.finished,
              employee_id: dto.employee_id,
              counter_value: 0,
              post_id: post.id,
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
        await tx.status.update({
          where: { id: lastStatusEntry.id },
          data: { idle_time: timeDelta },
        });
      }

      if (dto.defect_value) {
        await tx.defect.upsert({
          where: {
            summary_id_post_id: {
              summary_id: dto.summary_id,
              post_id: post.id,
            },
          },
          update: { value: Number(dto.defect_value) },
          create: {
            summary_id: dto.summary_id,
            post_id: post.id,
            value: Number(dto.defect_value),
          },
        });
      }
      return await tx.status.create({
        data: {
          summary_id: dto.summary_id,
          post_id: post.id,
          operation_id: dto.operation_id,
          idle: dto.idle,
          finished: dto.finished,
          employee_id: dto.employee_id,
          counter_value: lastStatusEntry.counter_value,
        },
      });
    });
  }
}
