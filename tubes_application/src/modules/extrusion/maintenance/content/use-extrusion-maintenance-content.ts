import type { ISummary } from "@/shared/api/services/summary-service";
import { useShallow } from "zustand/shallow";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useExtrusionMaintenanceStore } from "../../store/use-extrusion-maintenance-store";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useCreateStatus } from "@/shared/api/use-create-status";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import {
  useUpdateMaintenanceLog,
  type UpdateMaintenanceLogDto,
} from "@/shared/api";
import { useState } from "react";
import type { MaintenanceHookReturn } from "@/shared/components/layouts/maintenance-post-content-layout";

export default function useExtrusionMaintenanceContent({
  summaryData,
}: {
  summaryData: ISummary | null;
}): MaintenanceHookReturn {
  const items =
    summaryData && summaryData.extrusionMaintenances.length > 0
      ? summaryData.extrusionMaintenances
      : [];

  const navigate = useNavigate();
  const selectedMaintenance = useExtrusionMaintenanceStore(
    useShallow((state) => state.selectedMaintenance),
  );
  const setSelectedMaintenance = useExtrusionMaintenanceStore(
    useShallow((state) => state.setSelectedMaintenance),
  );
  const employee = useExtrusionEmployeeStore(
    useShallow((state) => state.extrusionEmployee),
  );

  const extrusionConveyor = useExtrusionConveyorStore(
    useShallow((state) => state.extrusionConveyor),
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
        post_val: 1,
        employee_id: employee.id,
        operation_id: null,
        maintenance_id: null,
        idle: false,
        finished: false,
      };
      createStatus(dto);
      navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
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
