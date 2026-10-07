import { ColumnDef } from "@tanstack/react-table";
import { OperationRow } from "../model";
import { Ban, Check } from "lucide-react";

export const baseOperationColumns: ColumnDef<OperationRow>[] = [
  {
    accessorKey: "code",
    header: () => <div className="text-center">Код</div>,
    cell: ({ row }) => {
      return <div className="text-center"> {row.original.value} </div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Наименование</div>,
    cell: ({ row }) => {
      return <div className="text-left"> {row.original.description} </div>;
    },
  },
  {
    accessorKey: "post_name",
    header: () => <div className="text-center">Пост</div>,
    cell: ({ row }) => {
      return <div className="text-center"> {row.original.post_name} </div>;
    },
  },
  {
    accessorKey: "min_rank_description",
    header: () => <div className="text-center">Разряд</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center"> {row.original.min_rank_description} </div>
      );
    },
  },
  {
    header: () => <div className="text-center">Активная</div>,
    id: "banned",
    cell: ({ row }) => {
      const operation = row.original;
      return (
        <div className="text-center">
          {operation.isInactive ? (
            <span className="inline-flex items-center gap-2 ">
              <Ban className="h-4 w-4" />
              <span className="leading-none">Нет</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 ">
              <Check className="h-4 w-4 " />
              <span className="leading-none">Да</span>
            </span>
          )}
        </div>
      );
    },
  },
];
