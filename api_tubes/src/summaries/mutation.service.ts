import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChangeSummaryStateDto } from "./dto/change-summary-state.dto";
import { StartSummaryDto } from "./dto/start-summary.dto";
import { UpdateSummaryDto } from "./dto/update-summary.dto";
import { SUMMARY_MODE } from "./constants/summary-mode.constant";

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
    const existsUser = await this.prisma.user.findUnique({
      where: { id: dto.user_id },
    });
    if (!existsUser)
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    if (dto.isSetup && dto.isSetup === 1) {
      return await this.prisma.$transaction(async (tx) => {
        const summaryToCopy = await tx.summary.findUnique({
          where: { id: dto.id },
          include: { specifications: true },
        });

        if (!summaryToCopy)
          throw new HttpException("Сводка не найдена", HttpStatus.NOT_FOUND);

        const summary = await tx.summary.create({
          data: {
            product_id: summaryToCopy.product_id,
            batch_id: summaryToCopy.batch_id,
            conveyor_id: summaryToCopy.conveyor_id,
            date: summaryToCopy.date,
            plan: summaryToCopy.plan,
            shift: summaryToCopy.shift,
            isActive: true,
            isFinished: false,
            isSetup: true,
            crew_id: dto.crew_id,
            responsible_id: dto.user_id,
            specifications: {
              create: summaryToCopy.specifications.map((spec) => ({
                material_id: spec.material_id,
              })),
            },
          },
        });
        return summary;
      });
    }
    const summary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        isActive: true,
        isFinished: false,
        responsible: { connect: { id: dto.user_id } },
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

    const isSetup = dto.mode_id === SUMMARY_MODE.TRANSITION;

    if (!isSetup) {
      const existsWorkingSummary = await this.prisma.summary.findFirst({
        where: {
          id: { not: dto.id },
          date: summary.date,
          conveyor_id: summary.conveyor_id,
          product_id: summary.product_id,
          batch_id: summary.batch_id,
          shift: summary.shift,
          isSetup: false,
        },
      });

      if (existsWorkingSummary)
        throw new HttpException(
          `Рабочая сводка с такими параметрами уже существует!`,
          HttpStatus.BAD_REQUEST,
        );
    }

    const updatedSummary = await this.prisma.summary.update({
      where: { id: dto.id },
      data: {
        plan: dto.plan,
        crew_id: dto.crew_id,
        isSetup,
      },
    });
    return updatedSummary;
  }
}
