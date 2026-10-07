import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api";
import { productApi } from "@/entities/product";
import { summaryApi } from "@/entities/summary";

export function useChangeProductWeight() {
  const client = useQueryClient();
  const { mutate: changeProductWeight, isPending: updatePending } = useMutation(
    {
      mutationFn: productApi.changeProductWeight,
      onSuccess: async () => {
        await Promise.all([
          client.invalidateQueries({
            queryKey: productApi.productQueries.all(),
          }),
          client.invalidateQueries({
            queryKey: summaryApi.summaryQueries.all(),
          }),
        ]);
        toast.success("Вес успешно обновлен");
      },
      onError: (err) => {
        const errMessage = handleError(err);
        toast.error(errMessage);
      },
    },
  );
  return { changeProductWeight, updatePending };
}
