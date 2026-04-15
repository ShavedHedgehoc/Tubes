import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";

import { useCreateStatus } from "@/shared/api/use-create-status";

import type { MaintenanceMenuHookReturn } from "@/shared/components/layouts/maintenance-menu-layout";
import { useSealantMaintenanceStore } from "../../store/use-sealant-maintenance-store";

export default function useSealantMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}): MaintenanceMenuHookReturn {
  const sealantConveyor = useSealantConveyorStore(
    useShallow((state) => state.sealantConveyor),
  );
  const employee = useSealantEmployeeStore(
    useShallow((state) => state.sealantEmployee),
  );
  const selectedMaintenance = useSealantMaintenanceStore(
    useShallow((state) => state.selectedMaintenance),
  );
  const setSelectedMaintenance = useSealantMaintenanceStore(
    useShallow((state) => state.setSelectedMaintenance),
  );
  const { createStatus } = useCreateStatus();
  const navigate = useNavigate();

  const setButtonsVisibleCondition =
    summaryData && summaryData.sealantStatus
      ? summaryData.sealantStatus.idle === false
        ? true
        : false
      : false;

  const setIdleButtonDisableCondition = !(
    summaryData &&
    employee &&
    selectedMaintenance
  );
  const handleExitClick = () => {
    navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
    setSelectedMaintenance(null);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedMaintenance) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 4,
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
