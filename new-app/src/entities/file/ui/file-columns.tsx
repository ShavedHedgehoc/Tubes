import { ColumnDef } from "@tanstack/react-table";
import { FileEntity } from "../model";

export const baseFileColumns: ColumnDef<FileEntity>[] = [
    {
        accessorKey: "filename",
        header: () => <div className="text-left pl-6">Имя файла </div>,
        cell: ({ row }) => {
            return <div className="text-left pl-6" > {row.original.filename} </div>;
        },
    },
    {
        accessorKey: "path",
        header: () => <div className="text-left">Путь</div>,
        cell: ({ row }) => {
            return <div className="text-left" > {row.original.path} </div>;
        },
    },

];
