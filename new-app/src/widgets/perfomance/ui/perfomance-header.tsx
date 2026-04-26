import { useSummaryCrewsStatsUiParams } from "@/entities/summary";
import { CrewsStatsFilter } from "@/features/crews-stats-filter";

export function PerfomanceHeader() {
  const { params } = useSummaryCrewsStatsUiParams();
  const extendHeader = params["isDefect"]
    ? "(Процент брака)"
    : "(Выполнение плана)";
  return (
    <div className="flex items-center w-full gap-4 mb-8 p-4">
      <div className="flex flex-col gap-4 w-full">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {`Показатели работы линий ${extendHeader}`}
          </h1>
        </div>
        <CrewsStatsFilter />
      </div>
    </div>
  );
}
