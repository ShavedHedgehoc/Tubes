import { ColumnDef } from "@tanstack/react-table";
import { ProductRow } from "../model";

export const baseProductColumns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "code",
    header: () => <div className="text-center">Код 1С </div>,
    cell: ({ row }) => {
      return <div className="text-left pl-6"> {row.original.code} </div>;
    },
  },
  {
    accessorKey: "marking",
    header: () => <div className="text-left">Артикул</div>,
    cell: ({ row }) => {
      return <div className="text-left"> {row.original.marking} </div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Наименование</div>,
    cell: ({ row }) => {
      return <div className="text-left"> {row.original.name} </div>;
    },
  },
];
