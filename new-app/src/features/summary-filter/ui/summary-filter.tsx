import { format } from "date-fns";
import { parseDate } from "@/shared/lib";
import { useSummarySearchParams } from "@/entities/summary";
import StateSelector from "./state-selector";
import CodeInput from "./code-input";
import ResetButton from "./reset-button";
import TodayButton from "./today-button";
import { DatePicker } from "@/shared/ui";
import ConveyorCombobox from "./conveyor-combobox";
import { ConveyorEntity } from "@/entities/conveyor";
import CrewCombobox from "./crew-combobox";
import { CrewEntity } from "@/entities/crew";

interface Props {
  conveyorListItems: ConveyorEntity[];
  crewListItems: CrewEntity[];
  actions?: React.ReactNode;
}

export function SummaryFilter({
  conveyorListItems,
  crewListItems,
  actions,
}: Props) {
  const { params, setParams } = useSummarySearchParams();

  return (
    <div className="flex  mb-4 justify-between">
      <div className="flex justify-start gap-2">
        <div className="flex flex-row">
          <DatePicker
            className="rounded-r-none border-r-0"
            value={parseDate(params.start_date)}
            onChange={(val) => {
              const str = val ? format(val, "yyyy-MM-dd") : null;
              if (str && params.end_date && str > params.end_date) {
                setParams({ start_date: str, end_date: str, page: 1 });
              } else {
                setParams({ start_date: str, page: 1 });
              }
            }}
          />
          <DatePicker
            className="rounded-none border-r-0"
            value={parseDate(params.end_date)}
            onChange={(val) => {
              const str = val ? format(val, "yyyy-MM-dd") : null;
              if (str && params.start_date && str < params.start_date) {
                setParams({ end_date: str, start_date: str, page: 1 });
              } else {
                setParams({ end_date: str, page: 1 });
              }
            }}
          />
          <ConveyorCombobox items={conveyorListItems} />
          <CrewCombobox items={crewListItems} />
          <CodeInput />
          <StateSelector />
        </div>
        <TodayButton />
        <ResetButton />
      </div>
      {actions}
    </div>
  );
}
