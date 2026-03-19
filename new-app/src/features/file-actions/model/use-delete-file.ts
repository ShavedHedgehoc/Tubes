import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fileApi } from "@/entities/file";

export function useDeleteFile() {
    const client = useQueryClient();
    const { mutate: deleteFile, isPending: deletePending } = useMutation({
        mutationFn: fileApi.deleteFile,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: fileApi.fileQueries.lists(),
            });
            toast.success("Файл успешно удален");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { deleteFile, deletePending };
}
