import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { summaryApi } from "@/entities/summary";
import { handleError } from "@/shared/api";

export function useDeleteSummary() {
  const client = useQueryClient();
  const { mutate: deleteSummary, isPending: deletePending } = useMutation({
    mutationFn: summaryApi.deleteSummary,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: summaryApi.summaryQueries.lists(),
      });
      toast.success("Сводка успешно удалена");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { deleteSummary, deletePending };
}
