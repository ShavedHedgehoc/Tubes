import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useShallow } from "zustand/shallow";
import {
  useVarnishCloseSummaryModalStore,
  useVarnishDefectInputModalStore,
} from "../../store/use-varnish-modal-store";
import { useVarnishDefectStore } from "../../store/use-varnish-defect-store";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useCreateStatus } from "@/shared/api/use-create-status";

export default function useVarnishCloseSummaryModal() {
  const open = useVarnishCloseSummaryModalStore(
    useShallow((state) => state.open),
  );
  const setOpen = useVarnishCloseSummaryModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenEntryModal = useVarnishDefectInputModalStore(
    useShallow((state) => state.setOpen),
  );
  const clearData = useVarnishDefectStore(
    useShallow((state) => state.clearData),
  );
  const data = useVarnishDefectStore(useShallow((state) => state.data));
  const employee = useVarnishEmployeeStore(
    useShallow((state) => state.varnishEmployee),
  );
  const varnishConveyor = useVarnishConveyorStore(
    useShallow((state) => state.varnishConveyor),
  );
  const { createStatus } = useCreateStatus();
  const { data: summaryData } = useActiveSummary(varnishConveyor?.id ?? null);

  const handleAddButtonClick = () => {
    setOpenEntryModal(true);
  };

  const handleEndButtonClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 2,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: true,
        defect_value: data,
      };

      createStatus(dto);
    }
    setOpen(false);
    setOpenEntryModal(false);
    clearData();
  };
  return {
    open,
    setOpen,
    data,
    clearData,
    handleAddButtonClick,
    handleEndButtonClick,
  };
}
