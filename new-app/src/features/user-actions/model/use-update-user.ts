import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useUpdateUser() {
    const client = useQueryClient();
    const { mutate: updateUser, isPending: updatePending } = useMutation({
        mutationFn: userApi.updateUser,
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: userApi.userQueries.all(),
            });
            toast.success("Сотрудник успешно обновлен");
        },
        onError: (err) => {
            const errMessage = handleError(err);
            toast.error(errMessage);
        },
    });
    return { updateUser, updatePending };
}
