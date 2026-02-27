import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee";
import { toast } from "sonner";

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
      toast.error(err.message);
    },
  });
  return { deleteEmployee, deletePending };
}
