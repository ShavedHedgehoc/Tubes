import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ApiMessages } from "src/resources/api-messages";
import { CreateStatusDto } from "./dto/create-status.dto";
import { GetStatusesDto } from "./dto/get-statuses.dto";
import { Prisma } from "generated/prisma";

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async createStatus(dto: CreateStatusDto) {
    return await this.prisma.$transaction(async (tx) => {
      const now = new Date();
      const [post, lastStatusEntry] = await Promise.all([
        tx.post.findUnique({ where: { value: dto.post_val } }),
        tx.status.findFirst({
          where: { summary_id: dto.summary_id, post: { value: dto.post_val } },
          orderBy: { id: "desc" },
        }),
      ]);

      if (!post) {
        throw new HttpException(
          ApiMessages.POST_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      let maintenanceSessionId: number | null = null;
      if (dto.maintenance_id) {
        const commonTasks = await tx.maintenanceTask.findMany({
          where: { maintenance_id: dto.maintenance_id },
        });
        const maintenanceSession = await tx.maintenanceSession.create({
          data: {
            maintenance_id: dto.maintenance_id,
            post_id: post.id,
            start_time: now,
            maintenance_logs: {
              create: commonTasks.map((task) => ({
                title: task.title,
                task_id: task.id,
                is_done: false,
              })),
            },
          },
        });
        maintenanceSessionId = maintenanceSession.id;
      }

      if (!lastStatusEntry) {
        if (!dto.idle) {
          throw new HttpException(
            ApiMessages.PREVISIOUS_STATUS_NOT_FOUND,
            HttpStatus.BAD_REQUEST,
          );
        }
        return tx.status.create({
          data: {
            summary_id: dto.summary_id,
            operation_id: dto.operation_id,
            maintenance_session_id: maintenanceSessionId,
            idle: dto.idle,
            finished: dto.finished,
            employee_id: dto.employee_id,
            counter_value: 0,
            post_id: post.id,
          },
        });
      }

      if (lastStatusEntry.idle) {
        const timeDelta = now.getTime() - lastStatusEntry.createdAt.getTime();

        if (lastStatusEntry.maintenance_session_id) {
          const session = await tx.maintenanceSession.findUnique({
            where: { id: lastStatusEntry.maintenance_session_id },
          });

          if (session) {
            const sessionDuration =
              now.getTime() - session.start_time.getTime();
            const aggregate = await tx.maintenanceLog.aggregate({
              _sum: { duration: true },
              where: { session_id: session.id },
            });

            await tx.maintenanceSession.update({
              where: { id: session.id },
              data: {
                end_time: now,
                total_duration: sessionDuration,
                work_duration: aggregate._sum.duration ?? 0,
              },
            });
          }
        }

        await tx.status.update({
          where: { id: lastStatusEntry.id },
          data: { idle_time: timeDelta },
        });

        if (dto.defect_value) {
          await tx.status.create({
            data: {
              summary_id: dto.summary_id,
              post_id: post.id,
              operation_id: dto.operation_id,
              idle: false,
              finished: false,
              employee_id: dto.employee_id,
              counter_value: lastStatusEntry.counter_value,
            },
          });
        }
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
      const isIdle = !!(maintenanceSessionId || dto.operation_id || dto.idle);
      return tx.status.create({
        data: {
          summary_id: dto.summary_id,
          post_id: post.id,
          operation_id: dto.operation_id,
          idle: isIdle,
          finished: dto.finished,
          employee_id: dto.employee_id,
          counter_value: lastStatusEntry.counter_value,
          maintenance_session_id: maintenanceSessionId,
        },
      });
    });
  }

  async getStatuses(query: GetStatusesDto) {
    type StatusWhere = Prisma.Args<
      typeof this.prisma.status,
      "findMany"
    >["where"];
    const summary = await this.prisma.summary.findUnique({
      where: { id: query.summary_id },
      include: { conveyor: true, batch: true, product: true },
    });
    if (!summary) throw new HttpException("", HttpStatus.NOT_FOUND);
    const where: StatusWhere = {
      summary_id: query.summary_id,
      ...(query.posts?.length && {
        post_id: { in: query.posts },
      }),
    };

    const [total, statuses] = await Promise.all([
      this.prisma.status.count({ where }),
      this.prisma.status.findMany({
        where,
        include: {
          operation: true,
          employee: true,
          post: true,
          maintenance_session: { include: { maintenance: true } },
        },
        orderBy: [{ createdAt: "asc" }],
        take: query.limit,
        skip: query.limit * (query.page - 1),
      }),
    ]);

    return { summary, statuses, total };
  }
}
