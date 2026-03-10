import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { conveyorApi } from "@/entities/conveyor";
import { summaryApi } from "@/entities/summary";

export function useStartConveyor() {
  const client = useQueryClient();
  const { mutate: startConveyor, isPending: startPending } = useMutation({
    mutationFn: summaryApi.setActiveSummary,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: conveyorApi.conveyorQueries.all(),
      });
      toast.success("Конвейер успешно запущен");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { startConveyor, startPending };
}
