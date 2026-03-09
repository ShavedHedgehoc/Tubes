import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { conveyorApi } from "@/entities/conveyor";
import { summaryApi } from "@/entities/summary";

export function useFinishConveyor() {
  const client = useQueryClient();
  const { mutate: finishConveyor, isPending: finishPending } = useMutation({
    mutationFn: summaryApi.setFinishSummary,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: conveyorApi.conveyorQueries.all(),
      });
      toast.success("Конвейер успешно завершен");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { finishConveyor, finishPending };
}
