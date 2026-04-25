import { SummaryDetailEntity } from "@/entities/summary";
import { format } from "date-fns";

export function FormHeader({ summary }: { summary: SummaryDetailEntity }) {
  return (
    <div className="flex flex-col text-xs text-muted-foreground">
      <div className="text-foreground font-semibold tracking-tight pb-0.5">
        {summary.product_code} {summary.marking}
      </div>
      <div>
        <p>
          Дата производства:{" "}
          <span>{format(new Date(summary.date), "dd-MM-yyyy")}</span>
        </p>
      </div>
      <div>
        <p>
          Смена: <span>{summary.shift === 1 ? "День" : "Ночь"}</span>
        </p>
      </div>
      <div>
        <p>
          Конвейер: <span>{summary.conveyor_name}</span>
        </p>
      </div>
      <div>
        <p>
          Партия: <span>{summary.batch_name}</span>
        </p>
      </div>
    </div>
  );
}
