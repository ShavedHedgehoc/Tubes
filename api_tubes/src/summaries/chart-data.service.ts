import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "db";
import { GetCrewsStatsDto } from "./dto/get-crews-stats.dto";

export interface CrewStat {
  crew_id: number;
  crew_name: string;
  total_weight: number;
  total_units: number;
  total_production: number;
  total_plan: number;
  defect_rate_goal: number | null;
  execution_goal: number | null;
  idles: Record<string, number>;
}

export interface CrewStatExtended extends CrewStat {
  execution: number;
  defect_percent: number;
}

@Injectable()
export class ChartDataService {
  constructor(private prisma: PrismaService) {}

  async getSummaryChartData(
    query: GetCrewsStatsDto,
  ): Promise<Record<string, CrewStatExtended[]>> {
    const startDate = new Date(new Date(query.start_date).setHours(0));
    const endDate = new Date(new Date(query.end_date).setHours(23));

    type SummaryWhere = Prisma.Args<
      typeof this.prisma.summary,
      "findMany"
    >["where"];
    const where: SummaryWhere = {
      date: { gte: startDate, lte: endDate },
    };

    const [
      defectsByS,
      productionByS,
      planByCC,
      goals,
      allSummaries,
      postNamesList,
      idlesBySP,
    ] = await Promise.all([
      this.prisma.defect.groupBy({
        by: ["summary_id"],
        where: { summary: where, post: { value: { in: [2, 3, 4] } } },
        _sum: { value: true },
      }),
      this.prisma.status.groupBy({
        by: ["summary_id"],
        where: { summary: where, finished: true, post: { value: 4 } },
        _sum: { counter_value: true },
      }),
      this.prisma.summary.groupBy({
        by: ["crew_id", "conveyor_id"],
        where: { ...where, isFinished: true },
        _sum: { plan: true },
      }),
      this.prisma.goal.findMany({
        where: { effective_from: { lte: endDate } },
        orderBy: { effective_from: "desc" },
      }),
      this.prisma.summary.findMany({
        where,
        select: {
          id: true,
          crew_id: true,
          conveyor_id: true,
          crew: { select: { name: true } },
          conveyor: { select: { name: true } },
          product: {
            select: { unit_weight: { take: 1, orderBy: { id: "desc" } } },
          },
        },
      }),
      this.prisma.post.findMany({
        select: { id: true, name: true },
      }),
      this.prisma.status.groupBy({
        by: ["summary_id", "post_id"],
        where: { summary: where, idle_time: { not: null } },
        _sum: { idle_time: true },
      }),
    ]);

    const getGoal = (name: string) =>
      goals.find((g) => g.metric_name === name)?.target_value ?? null;
    const defectRateGoal = getGoal("defect_rate");
    const executionGoal = getGoal("execution_rate");

    const summariesMap = new Map(allSummaries.map((s) => [s.id, s]));
    const conveyorNames = new Map(
      allSummaries.map((s) => [
        s.conveyor_id,
        s.conveyor?.name || `Линия ${s.conveyor_id}`,
      ]),
    );

    const postNamesMap = new Map(postNamesList.map((p) => [p.id, p.name]));

    const stats: Record<string, Record<number, CrewStat>> = { all: {} };

    const getOrInit = (cKey: string, crewId: number, crewName: string) => {
      if (!stats[cKey]) stats[cKey] = {};
      if (!stats[cKey][crewId]) {
        stats[cKey][crewId] = {
          crew_id: crewId,
          crew_name: crewName,
          total_weight: 0,
          total_units: 0,
          total_production: 0,
          total_plan: 0,
          defect_rate_goal: defectRateGoal,
          execution_goal: executionGoal,
          idles: {},
        };
      }
      return stats[cKey][crewId];
    };

    // 1. Дефекты
    defectsByS.forEach((def) => {
      const s = summariesMap.get(def.summary_id);
      if (!s || s.crew_id === null || s.conveyor_id === null) return;

      const wSum = def._sum.value || 0;
      const uW = s.product.unit_weight?.[0]?.weight || 0;
      const uQty = uW > 0 ? Math.round(wSum / uW) : 0;
      const cName = conveyorNames.get(s.conveyor_id) || "Неизвестно";

      [cName, "all"].forEach((key) => {
        const target = getOrInit(key, s.crew_id!, s.crew?.name || "Н/Д");
        target.total_weight += wSum;
        target.total_units += uQty;
      });
    });

    // 2. Производство
    productionByS.forEach((p) => {
      const s = summariesMap.get(p.summary_id);
      if (!s || s.crew_id === null || s.conveyor_id === null) return;

      const val = p._sum.counter_value || 0;
      const cName = conveyorNames.get(s.conveyor_id) || "Неизвестно";

      [cName, "all"].forEach((key) => {
        getOrInit(key, s.crew_id!, s.crew?.name || "Н/Д").total_production +=
          val;
      });
    });

    // 3. Планы
    planByCC.forEach((p) => {
      if (p.crew_id === null || p.conveyor_id === null) return;

      const val = p._sum.plan || 0;
      const cName =
        conveyorNames.get(p.conveyor_id) || `Линия ${p.conveyor_id}`;
      const crewName =
        allSummaries.find((s) => s.crew_id === p.crew_id)?.crew?.name || "Н/Д";

      [cName, "all"].forEach((key) => {
        getOrInit(key, p.crew_id!, crewName).total_plan += val;
      });
    });
    //

    // 4. Время простоев (Idles) с именами
    idlesBySP.forEach((idle) => {
      const s = summariesMap.get(idle.summary_id);
      if (!s || s.crew_id === null || s.conveyor_id === null) return;

      const idleTime = idle._sum.idle_time ? Number(idle._sum.idle_time) : 0;
      const postName = postNamesMap.get(idle.post_id) || `Пост ${idle.post_id}`;
      const cName = conveyorNames.get(s.conveyor_id) || "Неизвестно";

      [cName, "all"].forEach((key) => {
        const target = getOrInit(key, s.crew_id!, s.crew?.name || "Н/Д");

        if (!target.idles[postName]) target.idles[postName] = 0;
        target.idles[postName] += idleTime;
      });
    });

    const format = (list: Record<number, CrewStat>): CrewStatExtended[] =>
      Object.values(list).map((c) => {
        const sortedPostNames = Object.keys(c.idles).sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
        );
        const sortedIdles: Record<string, number> = {};
        sortedPostNames.forEach((name) => {
          const minutes = c.idles[name] / 60000;
          sortedIdles[name] = Math.round(minutes * 100) / 100;
        });
        return {
          ...c,
          idles: sortedIdles,
          total_weight: Math.round(c.total_weight * 100) / 100,
          execution:
            c.total_plan > 0
              ? Math.round((c.total_production / c.total_plan) * 10000) / 100
              : 0,
          defect_percent:
            c.total_production > 0
              ? Math.round((c.total_units / c.total_production) * 10000) / 100
              : 0,
        };
      });

    const result: Record<string, CrewStatExtended[]> = {};
    Object.keys(stats).forEach((key) => {
      result[key] = format(stats[key]);
    });

    return result;
  }
}
