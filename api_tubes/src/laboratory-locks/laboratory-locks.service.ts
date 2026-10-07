import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChangeLockDto } from "./dto/change-lock.dto";

@Injectable()
export class LaboratoryLocksService {
  constructor(private prisma: PrismaService) {}

  async changeLockState(dto: ChangeLockDto) {
    const { summary_id, lock_reason_id, state, post_val, user_id } = dto;

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

      const existsUser = await tx.user.findUnique({ where: { id: user_id } });

      if (!existsUser) {
        throw new HttpException(
          `Необходимо указать пользователя`,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Обработка запроса
      const now = new Date();
      if (state) {
        // Блокировка
        const lockReason = await tx.laboratoryLockReason.findFirst({
          where: { id: lock_reason_id },
          select: { id: true },
        });
        if (!lockReason) {
          throw new HttpException(
            `Причина не существует`,
            HttpStatus.NOT_FOUND,
          );
        }
        const newLock = await tx.laboratoryLock.create({
          data: {
            summary_id,
            post_id: post.id,
            is_active: true,
            user_id: user_id,
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
