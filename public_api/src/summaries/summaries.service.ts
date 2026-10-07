import { Injectable } from "@nestjs/common";
import { Prisma } from "db";
import { PrismaService } from "src/prisma/prisma.service";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import {
  SummariesListResponse,
  SummaryRow,
} from "./dto/summaries-list.response";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  async getList(query: GetSummariesListDto): Promise<SummariesListResponse> {
    type SummaryWhere = Prisma.Args<
      typeof this.prisma.summary,
      "findMany"
    >["where"];
    const { startDate, endDate, productCode, batchName, conveyors } = query;

    const where: SummaryWhere = {
      date: {
        gte: startDate,
        lte: endDate,
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

    const mappedSummaries: SummaryRow[] = summaries.map((s) => ({
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
    }));
    return { summaries: mappedSummaries };
  }
}
