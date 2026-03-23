import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useDeleteEmployee() {
  const client = useQueryClient();
  const { mutate: deleteEmployee, isPending: deletePending } = useMutation({
    mutationFn: employeeApi.deleteEmployee,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: employeeApi.employeeQueries.lists(),
      });
      toast.success("Сотрудник успешно удален");
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { deleteEmployee, deletePending };
}
