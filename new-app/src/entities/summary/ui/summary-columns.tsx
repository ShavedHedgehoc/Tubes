import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SummaryEntity } from "../model/types";
import { cn } from "@/shared/lib";

export const baseSummaryColumns: ColumnDef<SummaryEntity>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return (
        <div className="text-center">{format(summary.date, "yyyy-MM-dd")}</div>
      );
    },
  },
  {
    accessorKey: "conveyor",
    header: () => <div className="text-center">Конвейер</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-center">{summary.conveyor.name}</div>;
    },
  },
  {
    accessorKey: "crew",
    header: () => <div className="text-center">Бригада</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-center">{summary.crewName ?? "-"}</div>;
    },
  },
  {
    accessorKey: "shift",
    header: () => <div className="text-center">Смена</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return (
        <div className="text-center">
          {summary.shift === 1 ? "День" : summary.shift === 2 ? "Ночь" : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "batch",
    header: () => <div className="text-center">Партия</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-center">{summary.batch.name}</div>;
    },
  },
  {
    accessorKey: "code",
    header: () => <div className="text-center">Код 1С</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-center">{summary.product.code}</div>;
    },
  },
  {
    accessorKey: "marking",
    header: () => <div className="text-left pl-6">Артикул</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-left">{summary.product.marking}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left pl-35">Наименование</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-left">{summary.product.name}</div>;
    },
  },
  {
    accessorKey: "plan",
    header: () => <div className="text-center">План</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-center">{summary.plan}</div>;
    },
  },
  {
    accessorKey: "production",
    header: () => <div className="text-center">Выпуск</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return <div className="text-center">{summary.production ?? 0}</div>;
    },
  },
  {
    accessorKey: "execution",
    header: () => (
      <div className="text-center" style={{ width: "60px" }}>
        План %
      </div>
    ),
    cell: ({ row }) => {
      const { execution, executionGoal } = row.original;
      const isBelowGoal =
        execution !== null &&
        executionGoal !== null &&
        execution < executionGoal;

      return (
        <div
          className={cn(
            "text-center",
            !executionGoal && "text-muted-foreground/70",
            isBelowGoal && "text-destructive",
          )}
        >
          {execution ?? "-"}
        </div>
      );
    },
  },
];

export const lastSummaryColumns: ColumnDef<SummaryEntity>[] = [
  {
    accessorKey: "state",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      const summary = row.original;
      return (
        <div className="text-center">
          {summary.isFinished
            ? "Завершено"
            : summary.isActive
              ? "В работе"
              : "-"}
        </div>
      );
    },
  },
];
