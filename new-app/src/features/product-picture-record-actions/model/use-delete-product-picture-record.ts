import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { productApi } from "@/entities/product";

export function useDeleteProductPictureRecord() {
  const client = useQueryClient();
  const { mutate: deleteRecord, isPending: deletePending } = useMutation({
    mutationFn: productApi.deleteProductPictureRecord,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: productApi.productQueries.lists(),
        }),
        client.invalidateQueries({
          queryKey: productApi.productQueries.picture_ids(),
        }),
      ]);
      toast.success("Запись успешно удалена");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { deleteRecord, deletePending };
}
