import { summaryApi } from "@/entities/summary";
import { handleError } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadSummaryData() {
  const client = useQueryClient();
  const { mutate: upload, isPending: uploadPending } = useMutation({
    mutationFn: summaryApi.uploadData,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: summaryApi.summaryQueries.lists(),
      });
      toast.success("Данные загружены");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { upload, uploadPending };
}
