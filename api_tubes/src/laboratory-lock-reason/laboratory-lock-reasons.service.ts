import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLaboratoryLockReasonDto } from "./dto/create-laboratory-lock-reason.dto";

@Injectable()
export class LaboratoryLockReasonsService {
  constructor(private prisma: PrismaService) {}

  async getAllLabLockReasons() {
    const labLockReasons = await this.prisma.laboratoryLockReason.findMany();
    if (!labLockReasons) {
      return { labLockReasons: [] };
    }
    return { labLockReasons };
  }

  async createReason(dto: CreateLaboratoryLockReasonDto) {
    const existingReason = await this.prisma.laboratoryLockReason.findFirst({
      where: { value: dto.value },
    });
    if (existingReason)
      throw new HttpException(
        "Причина блокировки уже существует!",
        HttpStatus.BAD_REQUEST,
      );
    try {
      const reason = await this.prisma.laboratoryLockReason.create({
        data: dto,
      });
      return reason;
    } catch (_e) {
      throw new HttpException("Ошибка при записи", HttpStatus.BAD_REQUEST);
    }
  }
}
