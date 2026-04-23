import { SummaryReportBase } from "@/entities/status/model/types";
import { formatNumber } from "@/shared/lib";
import { format } from "date-fns";

export function Header({ data }: { data: SummaryReportBase | null }) {
  if (!data) return <></>;
  const statusLabel = data?.isActive
    ? "В работе"
    : data?.isFinished
      ? "Завершено"
      : "Не активна";
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">
        {data.productCode} {data.productName}
        <span className="ml-4 text-muted-foreground font-normal">
          ({statusLabel})
        </span>
      </h1>

      <div className="flex gap-6 text-sm text-muted-foreground space-y-1">
        <p>
          Партия: <span className="text-foreground">{data.batchName}</span>
        </p>
        <p>
          Дата производства:{" "}
          <span className="text-foreground">
            {format(new Date(data.date), "dd-MM-yyyy")}
          </span>
        </p>
        <p>
          Смена:{" "}
          <span className="text-foreground">
            {data.shift === 1 ? "День" : "Ночь"}
          </span>
        </p>
        <p>
          План:{" "}
          <span className="text-foreground font-medium">
            {formatNumber(data.plan)}
          </span>
        </p>
      </div>
    </div>
  );
}
