import { ColumnDef } from "@tanstack/react-table";
import { Ban, UserCheck } from "lucide-react";
import { EmployeeEntity } from "../model";

export const baseEmployeeColumns: ColumnDef<EmployeeEntity>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left pl-6">ФИО</div>,
    cell: ({ row }) => {
      return <div className="text-left pl-6">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "barcode",
    header: () => <div className="text-center">Штрихкод</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("barcode")}</div>;
    },
  },
  {
    accessorKey: "rank_id",
    header: () => <div className="text-center">Разряд</div>,
    cell: ({ row }) => {
      const employee = row.original;
      return <div className="text-center">{employee.rank.description}</div>;
    },
  },
  {
    header: () => <div className="text-center">Доступ</div>,
    id: "banned",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="text-center">
          {employee.banned ? (
            <span className="inline-flex items-center gap-2 ">
              <Ban className="h-4 w-4" />
              <span className="leading-none">Запрещен</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 ">
              <UserCheck className="h-4 w-4 " />
              <span className="leading-none">Разрешен</span>
            </span>
          )}
        </div>
      );
    },
  },
];
