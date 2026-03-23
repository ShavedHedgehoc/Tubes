import { ColumnDef } from "@tanstack/react-table";
import { baseProductColumns, ProductRow } from "@/entities/product";
import { PicturesColumn } from "@/features/pictures-column";
import { useDeleteProductPictureRecord } from "@/features/product-picture-record-actions";

const ActionsCell = ({ product }: { product: ProductRow }) => {
  const { deleteRecord } = useDeleteProductPictureRecord();
  const handleDelete = (fileId: number) => {
    deleteRecord({
      product_id: product.id,
      file_path_id: fileId,
    });
  };

  return (
    <div className="text-center">
      <PicturesColumn
        pictures={product.product_pictures}
        maxCardsQuantity={3}
        entityId={product.id}
        onDelete={handleDelete}
      />
    </div>
  );
};

export const getProductsColumns = (): ColumnDef<ProductRow>[] => {
  return [
    ...baseProductColumns,
    {
      id: "actions",
      cell: ({ row }) => <ActionsCell product={row.original} />,
    },
  ];
};
