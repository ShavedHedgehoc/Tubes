import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api";
import { operationApi } from "@/entities/operation";

export function useChangeOperationActivity() {
  const client = useQueryClient();
  const {
    mutate: changeOperationActivity,
    isPending: changeOperationActivityPending,
  } = useMutation({
    mutationFn: operationApi.changeOperationActivity,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: operationApi.operationQueries.lists(),
      });
      toast.success("Статус активности успешно обновлен");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { changeOperationActivity, changeOperationActivityPending };
}
