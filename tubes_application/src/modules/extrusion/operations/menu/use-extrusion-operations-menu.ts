import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useExtrusionOperationStore } from "../../store/use-extrusion-operation-store";
import { useCreateStatus } from "@/shared/api/use-create-status";

export default function useExtrusionOperationsMenu(
  summaryData: ISummary | null,
) {
  const extrusionConveyor = useExtrusionConveyorStore(
    useShallow((state) => state.extrusionConveyor),
  );
  const employee = useExtrusionEmployeeStore(
    useShallow((state) => state.extrusionEmployee),
  );
  const selectedOperation = useExtrusionOperationStore(
    useShallow((state) => state.selectedOperation),
  );
  const setSelectedOperation = useExtrusionOperationStore(
    useShallow((state) => state.setSelectedOperation),
  );
  const { createStatus } = useCreateStatus();
  const navigate = useNavigate();

  const setIdleButtonVisibleCondition =
    summaryData && summaryData.extrusionStatus
      ? summaryData.extrusionStatus.idle === false
        ? true
        : false
      : false;

  const setWorkingButtonVisibleCondition =
    summaryData && summaryData.extrusionStatus
      ? summaryData.extrusionStatus.idle === true
        ? true
        : false
      : false;

  const setIdleButtonDisableCondition = !(
    summaryData &&
    employee &&
    selectedOperation
  );

  const setWorkingButtonDisableCondition = !(summaryData && employee);

  const handleExitClick = () => {
    navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
    setSelectedOperation(null);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedOperation) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 1,
        employee_id: employee.id,
        operation_id: selectedOperation.id,
        maintenance_id: null,
        idle: true,
        finished: false,
      };
      createStatus(dto);
      navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
      setSelectedOperation(null);
    }
  };

  const handleWorkingClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 1,
        employee_id: employee.id,
        operation_id: null,
        maintenance_id: null,
        idle: false,
        finished: false,
      };
      createStatus(dto);
      navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
      setSelectedOperation(null);
    }
  };

  return {
    handleSetClick,
    handleWorkingClick,
    handleExitClick,
    setIdleButtonVisibleCondition,
    setWorkingButtonVisibleCondition,
    setIdleButtonDisableCondition,
    setWorkingButtonDisableCondition,
  };
}
