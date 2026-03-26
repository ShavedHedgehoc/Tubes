import { StatusEntity } from "@/entities/status";
import { useMemo } from "react";
import { StatusTableRow, StatusTableRowState } from "./types";

export function usePostTableCardData(statuses: StatusEntity[] = []) {
  return useMemo(() => {
    const data: StatusTableRow[] = (statuses ?? []).map((item, idx) => {
      const prevItem = statuses[idx - 1];
      let state: StatusTableRowState = "Внесение параметров";
      if (item.idle) {
        state = "Начало операции";
      } else if (item.finished) {
        state = "Окончание работы";
      } else if (prevItem?.idle) {
        state = "Конец операции";
      }

      return {
        id: item.id,
        date: item.createdAt,
        employee: item.employee_name,
        state: state as StatusTableRowState,
        operation: item.operation_description,
      };
    });

    return { data };
  }, [statuses]);
}
