import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { useCreateStatus } from "@/shared/api/use-create-status";
import type { MaintenanceMenuHookReturn } from "@/shared/components/layouts/maintenance-menu-layout";
import { useVarnishMaintenanceStore } from "../../store/use-varnish-maintenance-store";

export default function useVarnishMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}): MaintenanceMenuHookReturn {
  const varnishConveyor = useVarnishConveyorStore(
    useShallow((state) => state.varnishConveyor),
  );
  const employee = useVarnishEmployeeStore(
    useShallow((state) => state.varnishEmployee),
  );
  const selectedMaintenance = useVarnishMaintenanceStore(
    useShallow((state) => state.selectedMaintenance),
  );
  const setSelectedMaintenance = useVarnishMaintenanceStore(
    useShallow((state) => state.setSelectedMaintenance),
  );
  const { createStatus } = useCreateStatus();
  const navigate = useNavigate();

  const setButtonsVisibleCondition =
    summaryData && summaryData.varnishStatus
      ? summaryData.varnishStatus.idle === false
        ? true
        : false
      : false;

  const setIdleButtonDisableCondition = !(
    summaryData &&
    employee &&
    selectedMaintenance
  );
  const handleExitClick = () => {
    navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
    setSelectedMaintenance(null);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedMaintenance) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 2,
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
