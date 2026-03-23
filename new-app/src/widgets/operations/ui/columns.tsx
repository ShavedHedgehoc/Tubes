import { ColumnDef } from "@tanstack/react-table";
import { PicturesColumn } from "@/features/pictures-column";
import { baseOperationColumns, OperationRow } from "@/entities/operation";
import { useDeleteOperationPictureRecord } from "@/features/operation-picture-record-actions";

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
      id: "actions",
      cell: ({ row }) => <ActionsCell operation={row.original} />,
    },
  ];
};
