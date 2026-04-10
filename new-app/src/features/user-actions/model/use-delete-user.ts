import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useDeleteUser() {
    const client = useQueryClient();
    const { mutate: deleteUser, isPending: deletePending } = useMutation({
        mutationFn: userApi.deleteUser,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: userApi.userQueries.lists(),
            });
            toast.success("Сотрудник успешно удален");
        },
        onError: (err) => {
            const errMessage = handleError(err);
            toast.error(errMessage);
        },
    });
    return { deleteUser, deletePending };
}
