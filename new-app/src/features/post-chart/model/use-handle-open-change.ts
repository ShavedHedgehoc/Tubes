import { useStatusUiParams } from "@/entities/status";
import { useCallback } from "react";

export function useHandleOpenChange() {
  const { setParams } = useStatusUiParams();
  const handleOpenChange = useCallback(
    (open: boolean | string) => {
      if (!open) {
        setParams({
          "open-chart": false,
          summary_id: null,
          post_val: null,
          conveyor_name: null,
          post_title: null,
        });
      }
    },
    [setParams],
  );
  return { handleOpenChange };
}
