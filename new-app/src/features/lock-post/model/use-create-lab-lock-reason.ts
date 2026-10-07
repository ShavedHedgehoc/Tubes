import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";
import { labLockReasonApi } from "@/entities/lab-lock-reason";

export function useCreateLabLockReason() {
  const client = useQueryClient();
  const { mutateAsync: createReason, isPending: createReasonPending } =
    useMutation({
      mutationFn: labLockReasonApi.createLabLockReason,
      onSuccess: async () => {
        await client.invalidateQueries({
          queryKey: labLockReasonApi.labLockReasonQueries.lists(),
        });
        toast.success("Успешно добавлено");
      },
      onError: (err) => {
        const errMessage = handleError(err);
        toast.error(errMessage);
      },
    });

  return { createReason, createReasonPending };
}
