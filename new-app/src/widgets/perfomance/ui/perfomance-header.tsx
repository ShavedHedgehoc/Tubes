import { useSummaryCrewsStatsUiParams } from "@/entities/summary";
import { CrewsStatsFilter } from "@/features/crews-stats-filter";

export function PerfomanceHeader() {
  const { params } = useSummaryCrewsStatsUiParams();
  const headerLabels: Record<string, string> = {
    idle: "(Простои)",
    defect: "(Процент брака)",
    plan: "(Выполнение плана)",
  };

  const currentLabel = headerLabels[params.mode] || headerLabels.plan;

  return (
    <div className="flex items-center w-full gap-4 mb-8 p-4">
      <div className="flex flex-col gap-4 w-full">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {`Показатели работы линий ${currentLabel}`}
          </h1>
        </div>
        <CrewsStatsFilter />
      </div>
    </div>
  );
}
