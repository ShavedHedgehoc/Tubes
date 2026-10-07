import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { operationApi } from "@/entities/operation";

export function useCreateOperationPictureRecord() {
  const client = useQueryClient();
  const { mutate: createRecord, isPending: createPending } = useMutation({
    mutationFn: operationApi.createOperationPictureRecord,
    onSuccess: async () => {
      await Promise.all([
        client.invalidateQueries({
          queryKey: operationApi.operationQueries.lists(),
        }),
        client.invalidateQueries({
          queryKey: operationApi.operationQueries.picture_ids(),
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
