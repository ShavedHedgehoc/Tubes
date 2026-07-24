import { StatusEntity } from "@/entities/status";
import { useMemo } from "react";
import { Ids, StatusTableRow, StatusTableRowState } from "./types";

export function usePostTableCardData(statuses: StatusEntity[] = []) {
  return useMemo(() => {
    const data: StatusTableRow[] = (statuses ?? []).map((item, idx) => {
      const prevItem = statuses[idx - 1];
      let state: StatusTableRowState = "Внесение параметров";
      if (item.is_locked) {
        state = "Блокировка лабораторией";
      } else if (prevItem?.is_locked) {
        state = "Конец блокировки";
      } else if (item.idle) {
        state = "Начало операции";
      } else if (item.finished) {
        state = "Окончание работы";
      } else if (prevItem?.idle) {
        state = "Конец операции";
      }

      const ids: Ids = {
        extrusion_param_id: item.extrusion_param_id,
        varnish_param_id: item.varnish_param_id,
        offset_param_id: item.offset_param_id,
        sealant_param_id: item.sealant_param_id,
        maintenance_session_id: item.maintenance_session_id,
      };

      return {
        id: item.id,
        date: item.createdAt,
        employee: item.employee_name,
        state: state as StatusTableRowState,
        operation: item.operation_description || item.maintenance_description,
        ids: ids,
      };
    });

    return { data };
  }, [statuses]);
}
