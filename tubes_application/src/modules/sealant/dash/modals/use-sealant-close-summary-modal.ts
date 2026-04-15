import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useShallow } from "zustand/shallow";
import {
  useSealantCloseSummaryModalStore,
  useSealantDefectInputModalStore,
} from "../../store/use-sealant-modal-store";
import { useSealantDefectStore } from "../../store/use-sealant-defect-store";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useCreateStatus } from "@/shared/api/use-create-status";

export default function useSealantCloseSummaryModal() {
  const open = useSealantCloseSummaryModalStore(
    useShallow((state) => state.open),
  );
  const setOpen = useSealantCloseSummaryModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenEntryModal = useSealantDefectInputModalStore(
    useShallow((state) => state.setOpen),
  );
  const clearData = useSealantDefectStore(
    useShallow((state) => state.clearData),
  );
  const data = useSealantDefectStore(useShallow((state) => state.data));
  const employee = useSealantEmployeeStore(
    useShallow((state) => state.sealantEmployee),
  );
  const sealantConveyor = useSealantConveyorStore(
    useShallow((state) => state.sealantConveyor),
  );
  const { createStatus } = useCreateStatus();
  const { data: summaryData } = useActiveSummary(sealantConveyor?.id ?? null);

  const handleAddButtonClick = () => {
    setOpenEntryModal(true);
  };

  const handleEndButtonClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 4,
        employee_id: employee.id,
        operation_id: null,
        maintenance_id: null,
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
