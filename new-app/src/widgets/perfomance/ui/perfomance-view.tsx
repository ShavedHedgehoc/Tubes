"use client";
import {
  summaryApi,
  useSummaryCrewsStatsSearchParams,
  useSummaryCrewsStatsUiParams,
} from "@/entities/summary";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CrewsStatsChart } from "@/features/crews-stats-chart";
import { PerfomanceHeader } from "./perfomance-header";
import { CrewsIdlesChart } from "@/features/crews-idles-chart";

export function PerfomanceView() {
  const { params } = useSummaryCrewsStatsSearchParams();
  const { params: uiParams } = useSummaryCrewsStatsUiParams();
  const mode = uiParams["mode"];
  const { data } = useQuery({
    ...summaryApi.summaryQueries.crewStat(params, { isServer: false }),
    placeholderData: keepPreviousData,
  });

  if (!data) return <div className="p-10 text-center">Загрузка данных...</div>;

  const conveyorKeys = Object.keys(data).filter((key) => key !== "all");
  const allData = data["all"] || [];

  if (allData.length === 0 && conveyorKeys.length === 0) {
    return (
      <div className="container mx-auto py-10 space-y-10">
        <PerfomanceHeader />
        <div className="p-10 text-center text-muted-foreground">
          Данные за выбранный период отсутствуют
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-10">
      <PerfomanceHeader />
      <section className="flex justify-center">
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-bold mb-4 text-center text-muted-foreground uppercase tracking-wider">
            Общая статистика
          </h2>
          {mode === "idle" ? (
            <CrewsIdlesChart title="Все конвейеры" chartData={allData} />
          ) : (
            <CrewsStatsChart
              title="Все конвейеры"
              chartData={allData}
              isDefect={mode === "defect"}
            />
          )}
        </div>
      </section>
      {conveyorKeys.length > 0 && <hr className="border-muted" />}
      {conveyorKeys.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6 text-center text-muted-foreground uppercase tracking-wider">
            По конвейерам
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conveyorKeys.map((key) =>
              mode === "idle" ? (
                <CrewsIdlesChart
                  key={key}
                  title={`Конвейер ${key}`}
                  chartData={data[key]}
                />
              ) : (
                <CrewsStatsChart
                  key={key}
                  title={`Конвейер ${key}`}
                  chartData={data[key]}
                  isDefect={mode === "defect"}
                />
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
}
