import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { conveyorApi } from "@/entities/conveyor";
import { labLockApi } from "@/entities/lab-lock";

export function useChangeLock() {
  const client = useQueryClient();
  const { mutate: changeLock, isPending: changeLockPending } = useMutation({
    mutationFn: labLockApi.changeLock,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: conveyorApi.conveyorQueries.views(),
      });
      toast.success("Статус изменен");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { changeLock, changeLockPending };
}
