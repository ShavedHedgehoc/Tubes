import { ColumnDef } from "@tanstack/react-table";
import { OperationRow } from "../model";

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
];
