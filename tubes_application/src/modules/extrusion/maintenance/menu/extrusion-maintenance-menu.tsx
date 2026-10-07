import type { ISummary } from "@/shared/api/services/summary-service";
import useExtrusionMaintenanceMenu from "./use-extrusion-maintenance-menu";
import MaintenancePostMenuLayout from "@/shared/components/layouts/maintenance-menu-layout";

export default function ExtrusionMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostMenuLayout
      summaryData={summaryData}
      useMenuHook={useExtrusionMaintenanceMenu}
    />
  );
}
