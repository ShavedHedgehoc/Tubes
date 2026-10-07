import type { ISummary } from "@/shared/api/services/summary-service";
import MaintenancePostMenuLayout from "@/shared/components/layouts/maintenance-menu-layout";
import useOffsetMaintenanceMenu from "./use-offset-maintenance-menu";

export default function OffsetMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostMenuLayout
      summaryData={summaryData}
      useMenuHook={useOffsetMaintenanceMenu}
    />
  );
}
