import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { StatusTableRow } from "../model/types";

export const statusTableColumns: ColumnDef<StatusTableRow>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => {
      const status = row.original;
      return (
        <div className="text-center">{format(status.date, "yyyy-MM-dd")}</div>
      );
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-center">Время</div>,
    cell: ({ row }) => {
      const status = row.original;
      return (
        <div className="text-center">{format(status.date, "HH:mm:ss")}</div>
      );
    },
  },
  {
    accessorKey: "employee",
    header: () => <div className="text-left">Сотрудник</div>,
    cell: ({ row }) => {
      const status = row.original;
      return <div className="text-left"> {status.employee} </div>;
    },
  },
  {
    accessorKey: "state",
    header: () => <div className="text-left">Статус</div>,
    cell: ({ row }) => {
      const status = row.original;
      return <div className="text-left"> {status.state} </div>;
    },
  },
  {
    accessorKey: "operation",
    header: () => <div className="text-left">Операция</div>,
    cell: ({ row }) => {
      const status = row.original;
      return <div className="text-left"> {status.operation} </div>;
    },
    size: 400,
    minSize: 300,
  },
];
