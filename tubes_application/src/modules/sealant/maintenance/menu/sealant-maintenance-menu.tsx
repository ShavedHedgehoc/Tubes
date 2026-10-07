import type { ISummary } from "@/shared/api/services/summary-service";
import MaintenancePostMenuLayout from "@/shared/components/layouts/maintenance-menu-layout";
import useSealantMaintenanceMenu from "./use-sealant-maintenance-menu";

export function SealantMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostMenuLayout
      summaryData={summaryData}
      useMenuHook={useSealantMaintenanceMenu}
    />
  );
}
