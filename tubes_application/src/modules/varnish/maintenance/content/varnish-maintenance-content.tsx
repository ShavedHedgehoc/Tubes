import type { ISummary } from "@/shared/api/services/summary-service";
import useVarnishMaintenanceContent from "./use-varnish-maintenance-content";
import { useVarnishMaintenanceModalStore } from "../../store/use-varnish-modal-store";
import MaintenancePostContent from "@/shared/components/layouts/maintenance-post-content-layout";
export default function VarnishMaintenanceContent({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostContent
      summaryData={summaryData}
      type="varnish"
      useContentHook={useVarnishMaintenanceContent}
      useModalStore={useVarnishMaintenanceModalStore}
    />
  );
}
