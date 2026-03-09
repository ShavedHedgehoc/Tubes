import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { conveyorApi } from "@/entities/conveyor";

export function usePostClose() {
  const client = useQueryClient();
  const { mutate: postClose, isPending: closePending } = useMutation({
    mutationFn: conveyorApi.closePost,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: conveyorApi.conveyorQueries.views(),
      });
      toast.success("Работа поста прекращена");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { postClose, closePending };
}
