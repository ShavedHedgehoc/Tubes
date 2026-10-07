import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";

import { useCreateStatus } from "@/shared/api/use-create-status";
import { useExtrusionMaintenanceStore } from "../../store/use-extrusion-maintenance-store";
import type { MaintenanceMenuHookReturn } from "@/shared/components/layouts/maintenance-menu-layout";

export default function useExtrusionMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}): MaintenanceMenuHookReturn {
  const extrusionConveyor = useExtrusionConveyorStore(
    useShallow((state) => state.extrusionConveyor),
  );
  const employee = useExtrusionEmployeeStore(
    useShallow((state) => state.extrusionEmployee),
  );
  const selectedMaintenance = useExtrusionMaintenanceStore(
    useShallow((state) => state.selectedMaintenance),
  );
  const setSelectedMaintenance = useExtrusionMaintenanceStore(
    useShallow((state) => state.setSelectedMaintenance),
  );
  const { createStatus } = useCreateStatus();
  const navigate = useNavigate();

  const setButtonsVisibleCondition =
    summaryData && summaryData.extrusionStatus
      ? summaryData.extrusionStatus.idle === false
        ? true
        : false
      : false;

  const setIdleButtonDisableCondition = !(
    summaryData &&
    employee &&
    selectedMaintenance
  );
  const handleExitClick = () => {
    navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
    setSelectedMaintenance(null);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedMaintenance) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 1,
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
