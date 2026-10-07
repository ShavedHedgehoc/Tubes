// features/auth/hooks/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { authApi } from "..";
import { handleError } from "@/shared/api";
import { toast } from "sonner";

export const useLogout = () => {
  const client = useQueryClient();
  const { mutate: logout, isPending: logoutPending } = useMutation({
    mutationFn: authApi.logout,
    onMutate: async () => {
      client.clear();
      await signOut({ callbackUrl: "/login", redirect: true });
    },
    onError: (err) => {
      const errMessage = handleError(err);
      toast.error(errMessage);
    },
  });
  return { logout, logoutPending };
};
