import { ColumnDef } from "@tanstack/react-table";
import { baseFileColumns, FileEntity, PreviewCell } from "@/entities/file";
import { RowDropdown } from "@/features/file-actions";

export const getFilesColumns = (): ColumnDef<FileEntity>[] => {
  return [
    {
      id: "preview",
      cell: ({ row }) => {
        const file = row.original;
        return <PreviewCell file={file} />;
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
