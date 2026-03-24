import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { productApi } from "@/entities/product";

export function useCreateProductPictureRecord() {
  const client = useQueryClient();
  const { mutate: createRecord, isPending: createPending } = useMutation({
    mutationFn: productApi.createProductPictureRecord,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: productApi.productQueries.lists(),
        }),
        client.invalidateQueries({
          queryKey: productApi.productQueries.picture_ids(),
        }),
      ]);
      toast.success("Запись успешно добавлена");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { createRecord, createPending };
}
