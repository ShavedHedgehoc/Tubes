import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChangeSummaryStateDto } from "./dto/change-summary-state.dto";
import { StartSummaryDto } from "./dto/start-summary.dto";
import { UpdateSummaryDto } from "./dto/update-summary.dto";

@Injectable()
export class MutationService {
  constructor(private prisma: PrismaService) {}

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

  async startSummary(dto: StartSummaryDto) {
    const summary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        isActive: true,
        isFinished: false,
        crew: { connect: { id: dto.crew_id } },
      },
    });
    return summary;
  }

  async updateSummary(dto: UpdateSummaryDto) {
    const summary = await this.prisma.summary.findUnique({
      where: { id: dto.id },
    });

    if (!summary)
      throw new HttpException("Сводка не найдена", HttpStatus.NOT_FOUND);

    if (dto.crew_id !== undefined && dto.crew_id !== null) {
      const crew = await this.prisma.crew.findUnique({
        where: { id: dto.crew_id },
      });
      if (!crew)
        throw new HttpException("Бригада не найдена", HttpStatus.NOT_FOUND);
    }

    const updatedSummary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        plan: dto.plan,
        crew_id: dto.crew_id,
      },
    });
    return updatedSummary;
  }
}
