import { ColumnDef } from "@tanstack/react-table";
import { baseFileColumns, FileEntity } from "@/entities/file";
import { RowDropdown } from "@/features/file-actions";
import { ImageCard } from "@/shared/ui";

export const getFilesColumns = (): ColumnDef<FileEntity>[] => {
    return [
        {
            id: "preview",
            cell: ({ row }) => {
                const file = row.original;
                return (
                    <ImageCard url={`/images/${file.filename}`} />
                );
            },
        },
        ...baseFileColumns,
        {
            id: "actions",
            cell: ({ row }) => {
                const file = row.original;
                return (
                    <div className="text-center">
                        <RowDropdown id={file.id} />
                    </div>
                );
            },
        },
    ];
};
