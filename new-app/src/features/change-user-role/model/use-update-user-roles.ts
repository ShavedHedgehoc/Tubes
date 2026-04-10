import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/api";
import { userApi } from "@/entities/user";

export function useUpdateUserRoles() {
    const client = useQueryClient();
    const { mutate: updateUserRoles, isPending: updateRolesPending } =
        useMutation({
            mutationFn: userApi.updateRoles,
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: userApi.userQueries.lists(),
                });
                toast.success("Роли успешно обновлены");
            },
            onError: (err) => {
                const errMessage = handleError(err);
                toast.error(errMessage);
            },
        });
    return { updateUserRoles, updateRolesPending };
}
