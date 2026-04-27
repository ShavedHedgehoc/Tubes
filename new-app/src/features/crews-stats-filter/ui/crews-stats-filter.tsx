import { useSummaryCrewsStatsSearchParams } from "@/entities/summary";
import { parseDate } from "@/shared/lib";
import { DatePicker } from "@/shared/ui";
import { format } from "date-fns";
import { MonthSwitcher } from "./month-switcher";
import { Toggler } from "./toggler";

export function CrewsStatsFilter() {
  const { params, setParams } = useSummaryCrewsStatsSearchParams();

  return (
    <div className="flex w-full items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="flex flex-row">
          <DatePicker
            className="rounded-r-none border-r-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[180px]"
            value={parseDate(params.start_date)}
            onChange={(val) => {
              const str = val ? format(val, "yyyy-MM-dd") : null;
              if (str && params.end_date && str > params.end_date) {
                setParams({ start_date: str, end_date: str });
              } else {
                setParams({ start_date: str });
              }
            }}
          />
          <DatePicker
            className="rounded-l-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[180px]"
            value={parseDate(params.end_date)}
            onChange={(val) => {
              const str = val ? format(val, "yyyy-MM-dd") : null;
              if (str && params.start_date && str < params.start_date) {
                setParams({ end_date: str, start_date: str });
              } else {
                setParams({ end_date: str });
              }
            }}
          />
        </div>
        <MonthSwitcher />
      </div>
      <div className="ml-auto">
        <Toggler />
      </div>
    </div>
  );
}
