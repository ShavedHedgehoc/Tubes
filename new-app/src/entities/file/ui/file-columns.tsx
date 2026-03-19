import { ColumnDef } from "@tanstack/react-table";
import { FileEntity } from "../model";

export const baseFileColumns: ColumnDef<FileEntity>[] = [
  {
    accessorKey: "filename",
    header: () => <div className="text-left pl-6">Имя файла </div>,
    cell: ({ row }) => {
      return <div className="text-left pl-6"> {row.original.filename} </div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Описание</div>,
    cell: ({ row }) => {
      return <div className="text-left"> {row.original.description} </div>;
    },
  },
];
