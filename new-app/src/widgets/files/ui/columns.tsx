import { ColumnDef } from "@tanstack/react-table";
import { baseFileColumns, FileEntity } from "@/entities/file";

export const getFilesColumns = (): ColumnDef<FileEntity>[] => {
    return [
        ...baseFileColumns,
        {
            id: "actions",
            cell: ({ row }) => {
                const summary = row.original;
                return (
                    <div className="text-center">
                        Actions
                    </div>
                );
            },
        },
    ];
};
