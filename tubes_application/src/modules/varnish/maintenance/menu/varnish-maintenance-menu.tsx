import type { ISummary } from "@/shared/api/services/summary-service";
import MaintenancePostMenuLayout from "@/shared/components/layouts/maintenance-menu-layout";
import useVarnishMaintenanceMenu from "./use-varnish-maintenance-menu";

export default function VarnishMaintenanceMenu({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostMenuLayout
      summaryData={summaryData}
      useMenuHook={useVarnishMaintenanceMenu}
    />
  );
}
