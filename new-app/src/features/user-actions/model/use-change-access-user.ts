import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/entities/user";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useChangeAccessUser() {
    const client = useQueryClient();
    const { mutate: changeAccessUser, isPending: changeAccessPending } =
        useMutation({
            mutationFn: userApi.changeAccessUser,
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: userApi.userQueries.lists(),
                });
                toast.success("Статус доступа успешно обновлен");
            },
            onError: (err) => {
                const errMessage = handleError(err);
                toast.error(errMessage);
            },
        });
    return { changeAccessUser, changeAccessPending };
}
