import { tresholdApi } from "@/entities/treshold";
import { handleError } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadTresholdData() {
    const client = useQueryClient();
    const { mutate: upload, isPending: uploadPending } = useMutation({
        mutationFn: tresholdApi.uploadData,
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: tresholdApi.tresholdQueries.lists(),
            });
            toast.success("Данные загружены");
        },
        onError: (err) => {
            const errMessage = handleError(err);
            toast.error(errMessage);
        },
    });
    return { upload, uploadPending };
}
