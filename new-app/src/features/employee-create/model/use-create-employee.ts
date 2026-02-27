import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee";
import { toast } from "sonner";
import { handleError } from "@/shared/api/handle-error";

export function useCreateEmployee() {
  const client = useQueryClient();
  const { mutate: createEmployee, isPending: createPending } = useMutation({
    mutationFn: employeeApi.createEmployee,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: employeeApi.employeeQueries.lists(),
      });
      toast.success("Сотрудник успешно coздан");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { createEmployee, createPending };
}
