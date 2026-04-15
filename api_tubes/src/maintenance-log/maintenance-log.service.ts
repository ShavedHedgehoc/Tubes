import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateLogDto } from "./dto/update-log.dto";
import { MaintenanceLog } from "generated/prisma";

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

    if (dto.end_time && !log.start_time && !dto.start_time) {
      throw new HttpException(
        "Нельзя завершить задачу, которая еще не началась",
        HttpStatus.BAD_REQUEST,
      );
    }
    const isDone = dto.end_time !== undefined ? !!dto.end_time : !!log.end_time;

    return await this.prisma.maintenanceLog.update({
      where: { id: dto.id },
      data: {
        start_time: dto.start_time,
        end_time: dto.end_time,
        is_done: isDone,
      },
    });
  }
}
