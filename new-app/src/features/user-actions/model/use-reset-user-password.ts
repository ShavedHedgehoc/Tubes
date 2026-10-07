import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useResetUserPassword() {
  const { mutate: resetPassword, isPending: resetPasswordPending } =
    useMutation({
      mutationFn: userApi.resetPassword,
      onSuccess: () => {
        toast.success("Пароль успешно обновлен");
      },
      onError: (err) => {
        const errMessage = handleError(err);
        toast.error(errMessage);
      },
    });
  return { resetPassword, resetPasswordPending };
}
