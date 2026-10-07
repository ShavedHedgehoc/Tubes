import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { StatusWithIdsEntity } from "../model/types";

export const baseStatusColumns: ColumnDef<StatusWithIdsEntity>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => {
      const status = row.original;
      return (
        <div className="text-center">
          {format(status.createdAt, "yyyy-MM-dd")}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="text-center">Время</div>,
    cell: ({ row }) => {
      const status = row.original;
      return (
        <div className="text-center">
          {format(status.createdAt, "HH:mm:ss")}
        </div>
      );
    },
  },
  {
    accessorKey: "post",
    header: () => <div className="text-center">Пост</div>,
    cell: ({ row }) => {
      const status = row.original;
      return <div className="text-center">{`Пост ${status.post_val}`}</div>;
    },
  },
  {
    accessorKey: "employee",
    header: () => <div className="text-left">Сотрудник</div>,
    cell: ({ row }) => {
      const status = row.original;
      return <div className="text-left"> {status.employee_name} </div>;
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
      return <div className="text-left"> {status.operation_description} </div>;
    },
  },
];
