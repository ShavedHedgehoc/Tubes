import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "db";
import { PrismaService } from "src/prisma/prisma.service";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import {
  SummariesListResponse,
  SummaryRow,
} from "./dto/summaries-list.response";
import { ChangeLockDto } from "./dto/change-lock.dto";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  async getList(query: GetSummariesListDto): Promise<SummariesListResponse> {
    type SummaryWhere = Prisma.Args<
      typeof this.prisma.summary,
      "findMany"
    >["where"];
    const { startDate, endDate, productCode, batchName, conveyors } = query;

    const correctedStartDate = new Date(
      new Date(startDate).setHours(0, 0, 0, 0),
    );
    const correctedEndDate = new Date(
      new Date(endDate).setHours(23, 59, 59, 999),
    );

    const where: SummaryWhere = {
      date: {
        gte: correctedStartDate,
        lte: correctedEndDate,
      },
      product: productCode
        ? {
            code: productCode,
          }
        : undefined,
      batch: batchName
        ? {
            name: batchName,
          }
        : undefined,

      conveyor: query.conveyors?.length
        ? {
            name: {
              in: conveyors,
            },
          }
        : undefined,
    };

    const summaries = await this.prisma.summary.findMany({
      where,
      include: {
        product: true,
        batch: true,
        conveyor: true,
      },
    });

    if (summaries.length === 0) {
      return { summaries: [] };
    }

    const summaryIds = summaries.map((s) => s.id);

    const [allPosts, activeLocks] = await Promise.all([
      this.prisma.post.findMany({
        select: { id: true, name: true, value: true },
      }),
      this.prisma.laboratoryLock.findMany({
        where: { summary_id: { in: summaryIds }, is_active: true },
        select: { summary_id: true, post_id: true },
      }),
    ]);

    const activeLocksSet = new Set(
      activeLocks.map((lock) => `${lock.summary_id}_${lock.post_id}`),
    );

    const mappedSummaries: SummaryRow[] = summaries.map((s) => {
      const postStatuses = allPosts.map((post) => ({
        postId: post.id,
        postName: post.name,
        postValue: post.value,
        isLocked: activeLocksSet.has(`${s.id}_${post.id}`),
        // isFinished:post
      }));

      return {
        id: s.id,
        conveyorName: s.conveyor?.name ?? "",
        productCode: s.product?.code ?? "",
        productName: s.product?.name ?? "",
        batchName: s.batch?.name ?? "",
        plan: s.plan,
        isActive: s.isActive,
        isFinished: s.isFinished,
        date: s.date,
        shift: s.shift,
        postStatuses,
      };
    });

    return { summaries: mappedSummaries };
  }

  async changeLockState(dto: ChangeLockDto) {
    const { summary_id, lock_reason, lab_assistant, state, post_val } = dto;

    return await this.prisma.$transaction(async (tx) => {
      // Поиск поста и сводки по id
      const [summary, post] = await Promise.all([
        tx.summary.findUnique({
          where: { id: summary_id },
          select: { isActive: true },
        }),
        tx.post.findFirst({
          where: { value: post_val },
          select: { id: true },
        }),
      ]);
      // Если сводка не найдена
      if (!summary) {
        throw new HttpException(
          `Сводка с ID ${summary_id} не найдена`,
          HttpStatus.NOT_FOUND,
        );
      }
      // Если пост не найден
      if (!post) {
        throw new HttpException(
          `Пост с таким номером не существует`,
          HttpStatus.NOT_FOUND,
        );
      }
      // Нельзя менять блокировки у неактивных сводок
      if (!summary.isActive) {
        throw new HttpException(
          `Сводка неактивна. Изменение статуса невозможно`,
          HttpStatus.BAD_REQUEST,
        );
      }
      // Поиск последней блокировки
      const lockExists = await tx.laboratoryLock.findFirst({
        where: { summary_id, post_id: post.id },
        orderBy: { createdAt: "desc" },
      });
      // Поиск последнего статуса
      const lastStatus = await tx.status.findFirst({
        where: { summary_id, post_id: post.id },
        orderBy: { createdAt: "desc" },
      });
      // Проверка повторного запроса
      const currentLockStatus = lockExists ? lockExists.is_active : false;
      if (currentLockStatus === state) {
        throw new HttpException(
          `Пост уже находится в состоянии: ${state ? "Заблокирован" : "Разблокирован"}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const isIdle = lastStatus && lastStatus.idle;
      const isFinished = lastStatus && lastStatus.finished;

      // Нельзя менять блокировки завершившего работу поста
      if (isFinished) {
        throw new HttpException(
          `Пост завершил работу. Изменение статуса невозможно`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Обработка запроса
      const now = new Date();
      if (state) {
        // Блокировка
        if (!lock_reason && !lab_assistant) {
          throw new HttpException(
            `Необходимо указать причину блокировки и имя сотрудника лаборатории`,
            HttpStatus.BAD_REQUEST,
          );
        }
        const lockReason = await tx.laboratoryLockReason.upsert({
          where: { value: lock_reason },
          update: { value: lock_reason },
          create: { value: lock_reason },
        });
        const labAssistant = await tx.laboratoryAssistant.upsert({
          where: { name: lab_assistant },
          update: { name: lab_assistant },
          create: { name: lab_assistant },
        });
        const newLock = await tx.laboratoryLock.create({
          data: {
            summary_id,
            post_id: post.id,
            is_active: true,
            // description: description || 'Блокировка лабораторией',
            laboratory_assistant_id: labAssistant.id,
            laboratory_lock_reason_id: lockReason.id,
          },
        });
        if (!isIdle) {
          await tx.status.create({
            data: {
              summary_id,
              post_id: post.id,
              employee_id: lastStatus?.employee_id ?? null,
              counter_value: lastStatus?.counter_value ?? 0,
              idle: true,
              is_locked: true,
              laboratory_lock_id: newLock.id,
              idle_time: null,
              finished: false,
            },
          });
        }
        return { message: "Пост успешно заблокирован" };
      } else {
        // Разблокировка
        // Проверка, заблокирован ли пост
        if (!lockExists) {
          throw new HttpException(
            `Не найдена запись блокировки`,
            HttpStatus.NOT_FOUND,
          );
        }
        await tx.laboratoryLock.update({
          where: { id: lockExists.id },
          data: { is_active: false, closedAt: now },
        });
        if (!lastStatus) {
          throw new HttpException(
            `Не найдена запись статуса для изменения состояния`,
            HttpStatus.NOT_FOUND,
          );
        }

        const isLockedByMe =
          lastStatus.is_locked &&
          lastStatus.laboratory_lock_id === lockExists.id;
        if (isLockedByMe) {
          const durationMs = now.getTime() - lastStatus.createdAt.getTime();
          await tx.status.update({
            where: { id: lastStatus.id },
            data: { idle_time: durationMs },
          });
          await tx.status.create({
            data: {
              summary_id,
              post_id: post.id,
              employee_id: lastStatus?.employee_id ?? null,
              counter_value: lastStatus?.counter_value ?? 0,
              idle: false,
              is_locked: false,
              laboratory_lock_id: lastStatus.laboratory_lock_id,
              idle_time: null,
              finished: false,
            },
          });
        }
        return { message: "Пост успешно разблокирован" };
      }
    });
  }
}
