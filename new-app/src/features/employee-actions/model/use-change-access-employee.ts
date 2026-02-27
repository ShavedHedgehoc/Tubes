import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeApi } from "@/entities/employee";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useChangeAccessEmployee() {
  const client = useQueryClient();
  const { mutate: changeAccessEmployee, isPending: changeAccessPending } =
    useMutation({
      mutationFn: employeeApi.changeAccessEmployee,
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: employeeApi.employeeQueries.lists(),
        });
        toast.success("Статус доступа успешно обновлен");
      },
      onError: (err) => {
        const errMessage = handleError(err);
        toast.error(errMessage);
      },
    });
  return { changeAccessEmployee, changeAccessPending };
}
