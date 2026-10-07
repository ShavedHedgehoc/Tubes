import { ColumnDef } from "@tanstack/react-table";
import { PicturesColumn } from "@/features/pictures-column";
import { baseOperationColumns, OperationRow } from "@/entities/operation";
import { useDeleteOperationPictureRecord } from "@/features/operation-picture-record-actions";
import { RowDropdown } from "@/features/operation-actions";

const ActionsCell = ({ operation }: { operation: OperationRow }) => {
  const { deleteRecord } = useDeleteOperationPictureRecord();
  const handleDelete = (fileId: number) => {
    deleteRecord({
      operation_id: operation.id,
      file_path_id: fileId,
    });
  };

  return (
    <div className="text-center">
      <PicturesColumn
        pictures={operation.operation_pictures}
        maxCardsQuantity={3}
        entityId={operation.id}
        onDelete={handleDelete}
      />
    </div>
  );
};

export const getOperationsColumns = (): ColumnDef<OperationRow>[] => {
  return [
    ...baseOperationColumns,
    {
      id: "picture_actions",
      cell: ({ row }) => <ActionsCell operation={row.original} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <RowDropdown
              id={row.original.id}
              isInactive={row.original.isInactive}
            />
          </div>
        );
      },
    },
  ];
};
