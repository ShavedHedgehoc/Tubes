import { useMutation } from "@tanstack/react-query";
import { authApi } from "..";
import { handleError } from "@/shared/api";
import { toast } from "sonner";

export const useRegister = () => {
  const { mutateAsync: register, isPending: registerPending } = useMutation({
    mutationFn: authApi.register,
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { register, registerPending };
};
