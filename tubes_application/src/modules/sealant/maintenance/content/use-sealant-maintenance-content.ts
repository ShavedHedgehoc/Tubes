import type { ISummary } from "@/shared/api/services/summary-service";
import { useShallow } from "zustand/shallow";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useSealantMaintenanceStore } from "../../store/use-sealant-maintenance-store";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useCreateStatus } from "@/shared/api/use-create-status";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import {
  useUpdateMaintenanceLog,
  type UpdateMaintenanceLogDto,
} from "@/shared/api";
import { useState } from "react";
import type { MaintenanceHookReturn } from "@/shared/components/layouts/maintenance-post-content-layout";

export default function useSealantMaintenanceContent({
  summaryData,
}: {
  summaryData: ISummary | null;
}): MaintenanceHookReturn {
  const items =
    summaryData && summaryData.sealantMaintenances.length > 0
      ? summaryData.sealantMaintenances
      : [];

  const navigate = useNavigate();
  const selectedMaintenance = useSealantMaintenanceStore(
    useShallow((state) => state.selectedMaintenance),
  );
  const setSelectedMaintenance = useSealantMaintenanceStore(
    useShallow((state) => state.setSelectedMaintenance),
  );
  const employee = useSealantEmployeeStore(
    useShallow((state) => state.sealantEmployee),
  );

  const sealantConveyor = useSealantConveyorStore(
    useShallow((state) => state.sealantConveyor),
  );

  const { createStatus, isPending } = useCreateStatus();
  const { updateMaintenanceLog } = useUpdateMaintenanceLog();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const startTask = ({ id, time }: { id: number; time: Date }) => {
    const dto: UpdateMaintenanceLogDto = {
      id: id,
      start_time: time,
      end_time: null,
    };
    updateMaintenanceLog(dto);
  };

  const endTask = ({ id, time }: { id: number; time: Date }) => {
    const dto: UpdateMaintenanceLogDto = {
      id: id,
      start_time: null,
      end_time: time,
    };
    updateMaintenanceLog(dto);
  };

  const handleCloseClick = () => {
    if (summaryData && employee) {
      setIsRedirecting(true);
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        post_val: 4,
        employee_id: employee.id,
        operation_id: null,
        maintenance_id: null,
        idle: false,
        finished: false,
      };
      createStatus(dto);
      navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
      setSelectedMaintenance(null);
    }
  };

  return {
    items,
    selectedMaintenance,
    setSelectedMaintenance,
    employee,
    handleCloseClick,
    isPending,
    startTask,
    endTask,
    isRedirecting,
  };
}
