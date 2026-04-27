import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetSummariesListDto } from "./dto/get-summaries-list.dto";
import { Prisma } from "generated/prisma";
import { SummaryDetailResponse } from "./dto/summary-detail.response";

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async getSummariesList(query: GetSummariesListDto) {
    const startDate = new Date(new Date(query.start_date).setHours(0));
    const endDate = new Date(new Date(query.end_date).setHours(23));

    const goals = await this.prisma.goal.findMany({
      where: { effective_from: { lte: endDate } },
      orderBy: { effective_from: "desc" },
    });

    const getGoalValue = (metricName: string, date: Date) => {
      return (
        goals.find(
          (g) => g.metric_name === metricName && g.effective_from <= date,
        )?.target_value ?? null
      );
    };

    type SummaryWhere = Prisma.Args<
      typeof this.prisma.summary,
      "findMany"
    >["where"];

    const where: SummaryWhere = {
      date: {
        gte: startDate,
        lte: endDate,
      },
      ...(query.conveyors?.length && {
        conveyor_id: { in: query.conveyors },
      }),
      ...(query.crews?.length && {
        OR: [
          { crew_id: { in: query.crews.filter((id) => id !== 0) } },
          ...(query.crews.includes(0) ? [{ crew_id: null }] : []),
        ],
      }),
      product: query.code
        ? {
            code: { contains: query.code, mode: "insensitive" },
          }
        : undefined,
      ...(query.states?.includes(2) && { isFinished: true }),
      ...(query.states?.includes(1) && { isActive: true }),
    };

    const [count, summaries] = await Promise.all([
      this.prisma.summary.count({ where }),
      this.prisma.summary.findMany({
        where,
        include: {
          crew: true,
          product: {
            include: { unit_weight: { take: 1, orderBy: [{ id: "desc" }] } },
          },
          batch: true,
          conveyor: true,
          statuses: {
            select: { counter_value: true },
            where: { finished: true, post: { value: 4 } },
            take: 1,
            orderBy: [{ id: "desc" }],
          },
          _count: {
            select: {
              statuses: true,
            },
          },
          defects: {
            where: {
              post: {
                value: { in: [2, 3, 4] },
              },
            },
          },
        },
        orderBy: [
          { date: "asc" },
          { conveyor: { name: "asc" } },
          { shift: "asc" },
        ],
        take: query.limit,
        skip: query.limit * (query.page - 1),
      }),
    ]);

    const rows = summaries.map((summary) => {
      const totalDefects =
        Math.round(
          summary.defects.reduce((sum, d) => sum + (d.value || 0), 0) * 100,
        ) / 100;

      const unitWeight = summary.product.unit_weight?.[0]?.weight ?? null;
      const defectsInUnits = unitWeight
        ? Math.round(totalDefects / unitWeight)
        : null;
      const production = summary.statuses?.[0]?.counter_value ?? null;
      const defectPercent =
        production && defectsInUnits
          ? Math.round((defectsInUnits / production) * 100 * 100) / 100
          : null;
      const {
        statuses: _statuses,
        product,
        crew,
        defects: _defects,
        ...rest
      } = summary;
      const { unit_weight: _unit_weight, ...productRest } = product;
      const execution = production
        ? Math.round((production / summary.plan) * 100 * 100) / 100
        : null;
      const crewName = crew ? crew.name : null;
      const defectRateGoal = getGoalValue("defect_rate", summary.date);
      const executionGoal = getGoalValue("execution_rate", summary.date);
      return {
        ...rest,
        product: productRest,
        unitWeight: unitWeight,
        production,
        execution,
        defectPercent,
        crewName,
        defectRateGoal,
        executionGoal,
      };
    });

    return { total: count, rows: rows };
  }

  async getSummaryById(id: number): Promise<SummaryDetailResponse> {
    const summary = await this.prisma.summary.findUnique({
      where: { id: id },
      include: {
        batch: true,
        product: true,
        conveyor: true,
        crew: true,
      },
    });
    if (!summary) throw new HttpException("", HttpStatus.NOT_FOUND);
    const { product, batch, conveyor, crew, ...rest } = summary;
    const mappedSummary: SummaryDetailResponse = {
      ...rest,
      batch_name: batch.name,
      product_code: product.code,
      product_name: product.name,
      marking: product.marking,
      conveyor_name: conveyor.name,
      crew_id: crew?.id ?? null,
    };
    return mappedSummary;
  }
}
