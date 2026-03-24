import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { operationApi } from "@/entities/operation";

export function useDeleteOperationPictureRecord() {
  const client = useQueryClient();
  const { mutate: deleteRecord, isPending: deletePending } = useMutation({
    mutationFn: operationApi.deleteOperationPictureRecord,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: operationApi.operationQueries.lists(),
        }),
        client.invalidateQueries({
          queryKey: operationApi.operationQueries.picture_ids(),
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
