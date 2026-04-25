import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api";
import { summaryApi } from "@/entities/summary";

export function useUpdateSummary() {
  const client = useQueryClient();
  const { mutate: updateSummary, isPending: updatePending } = useMutation({
    mutationFn: summaryApi.updateSummary,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: summaryApi.summaryQueries.all(),
      });
      toast.success("Сводка успешно обновлена");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { updateSummary, updatePending };
}
