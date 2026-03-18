import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fileApi } from "@/entities/file";
import { toast } from "sonner";
import { handleError } from "@/shared/api";

export function useUploadFile() {
    const client = useQueryClient();
    const { mutate: uploadFile, isPending: uploadPending } = useMutation({
        mutationFn: fileApi.uploadFile,
        onSuccess: async () => {
            await client.invalidateQueries({ queryKey: fileApi.fileQueries.lists() })
            toast.success("Файл успешно загружен")
        },
        onError: (err) => {
            const errMessage = handleError(err);
            toast.error(errMessage);
        },
    });
    return { uploadFile, uploadPending };
}
