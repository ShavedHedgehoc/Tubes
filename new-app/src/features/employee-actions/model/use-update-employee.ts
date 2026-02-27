import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useUpdateEmployee() {
  const client = useQueryClient();
  const { mutate: updateEmployee, isPending: updatePending } = useMutation({
    mutationFn: employeeApi.updateEmployee,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: employeeApi.employeeQueries.all(),
      });
      toast.success("Сотрудник успешно обновлен");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { updateEmployee, updatePending };
}
