import { ColumnDef } from "@tanstack/react-table";
import { SummaryAvailable } from "../model";
import { format } from "date-fns";

export const baseAvailableSummariesColumns: ColumnDef<SummaryAvailable>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => (
      <div className="text-center opacity-80">
        {format(new Date(row.original.date), "dd.MM.yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "shift",
    header: () => <div className="text-center">Смена</div>,
    cell: ({ row }) => (
      <div className="text-center opacity-80">{row.original.shift}</div>
    ),
  },
  {
    accessorKey: "batch.name",
    header: () => <div className="text-center">Партия</div>,
    cell: ({ row }) => (
      <div className="text-center opacity-80">{row.original.batch.name}</div>
    ),
  },
  {
    accessorKey: "product.name",
    header: () => <div className="text-center">Продукт</div>,
    cell: ({ row }) => (
      <div className="flex flex-col max-w-[300px]">
        <span className="text-sm font-semibold truncate leading-tight">
          {row.original.product.name}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
          {row.original.product.code} — {row.original.product.marking}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "plan",
    header: () => <div className="text-center">План</div>,
    cell: ({ row }) => (
      <div className="text-center ">
        {new Intl.NumberFormat("ru-RU").format(row.original.plan)}
      </div>
    ),
  },
];
