import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import {
  summaryApi,
  SummaryParams,
  SummaryResponse,
  useSummarySearchParams,
} from "@/entities/summary";
import { handleError } from "@/shared/api";

export function useDeleteSummary() {
  const client = useQueryClient();
  const { params, setParams } = useSummarySearchParams();
  const page = Number(params["page"]) || 1;
  const { mutate: deleteSummary, isPending: deletePending } = useMutation({
    mutationFn: summaryApi.deleteSummary,
    onSuccess: () => {
      const baseListKey = summaryApi.summaryQueries.lists();
      const exactListKey = summaryApi.summaryQueries.list(
        params as SummaryParams,
      ).queryKey;

      const currentCache = client.getQueryData<SummaryResponse>(exactListKey);
      const currentItems = currentCache?.summaries || [];

      if (currentItems.length === 1 && page > 1) {
        const prevParams = { ...params, page: page - 1 };
        const prevListKey = summaryApi.summaryQueries.list(
          prevParams as SummaryParams,
        ).queryKey;
        const prevCache = client.getQueryData<SummaryResponse>(prevListKey);
        if (prevCache) {
          client.setQueryData<SummaryResponse>(prevListKey, {
            ...prevCache,
            total: Math.max(0, prevCache.total - 1),
            totalPages: Math.max(1, prevCache.totalPages - 1),
          });
        }
        setParams({ page: page - 1 });
      } else {
        client.invalidateQueries({ queryKey: baseListKey });
      }
      toast.success("Сводка успешно удалена");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { deleteSummary, deletePending };
}
