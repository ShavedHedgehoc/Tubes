import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateLogDto } from "./dto/update-log.dto";
import { MaintenanceLog } from "db";

@Injectable()
export class MaintenanceLogService {
  constructor(private prisma: PrismaService) {}

  async updateLog(dto: UpdateLogDto): Promise<MaintenanceLog> {
    const log = await this.prisma.maintenanceLog.findUnique({
      where: { id: dto.id },
    });

    if (!log) {
      throw new HttpException("Задача не найдена", HttpStatus.NOT_FOUND);
    }

    const startTime = dto.start_time
      ? new Date(dto.start_time)
      : log.start_time;
    const endTime = dto.end_time ? new Date(dto.end_time) : log.end_time;

    const duration =
      startTime && endTime
        ? new Date(endTime).getTime() - new Date(startTime).getTime()
        : null;

    if (endTime && !startTime) {
      throw new HttpException(
        "Нельзя завершить задачу, которая еще не началась",
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.maintenanceLog.update({
      where: { id: dto.id },
      data: {
        start_time: startTime,
        end_time: endTime,
        duration: duration,
        is_done: !!endTime,
      },
    });
  }
}
