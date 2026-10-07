import handleError from "@/shared/api/http/handle-error";
import { AppMessages } from "@/shared/resources/app-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import MaintenanceLogService from "./services/maintenance-log-service";

export function useUpdateMaintenanceLog() {
  const client = useQueryClient();

  const { mutate: updateMaintenanceLog, isPending } = useMutation({
    mutationFn: MaintenanceLogService.updateMaintenanceLog,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["active_summary"] });
      enqueueSnackbar(AppMessages.RECORD_SUCCESFULL_ADDED, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    },
  });
  return { updateMaintenanceLog, isPending };
}
