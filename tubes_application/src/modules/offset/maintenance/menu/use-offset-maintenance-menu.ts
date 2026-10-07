import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";

import { useCreateStatus } from "@/shared/api/use-create-status";

import type { MaintenanceMenuHookReturn } from "@/shared/components/layouts/maintenance-menu-layout";
import { useOffsetMaintenanceStore } from "../../store/use-offset-maintenance-store";

export default function useOffsetMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}): MaintenanceMenuHookReturn {
  const offsetConveyor = useOffsetConveyorStore(
    useShallow((state) => state.offsetConveyor),
  );
  const employee = useOffsetEmployeeStore(
    useShallow((state) => state.offsetEmployee),
  );
  const selectedMaintenance = useOffsetMaintenanceStore(
    useShallow((state) => state.selectedMaintenance),
  );
  const setSelectedMaintenance = useOffsetMaintenanceStore(
    useShallow((state) => state.setSelectedMaintenance),
  );
  const { createStatus } = useCreateStatus();
  const navigate = useNavigate();

  const setButtonsVisibleCondition =
    summaryData && summaryData.offsetStatus
      ? summaryData.offsetStatus.idle === false
        ? true
        : false
      : false;

  const setIdleButtonDisableCondition = !(
    summaryData &&
    employee &&
    selectedMaintenance
  );
  const handleExitClick = () => {
    navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
    setSelectedMaintenance(null);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedMaintenance) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 3,
        employee_id: employee.id,
        maintenance_id: selectedMaintenance.id,
        operation_id: null,
        idle: true,
        finished: false,
      };
      createStatus(dto);
      setSelectedMaintenance(null);
    }
  };

  return {
    handleSetClick,
    handleExitClick,
    setButtonsVisibleCondition,
    setIdleButtonDisableCondition,
  };
}
