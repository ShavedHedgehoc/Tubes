import type { ISummary } from "@/shared/api/services/summary-service";
import useOffsetMaintenanceContent from "./use-offset-maintenance-content";
import { useOffsetMaintenanceModalStore } from "../../store/use-offset-modal-store";
import MaintenancePostContent from "@/shared/components/layouts/maintenance-post-content-layout";
export default function OffsetMaintenanceContent({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostContent
      summaryData={summaryData}
      type="offset"
      useContentHook={useOffsetMaintenanceContent}
      useModalStore={useOffsetMaintenanceModalStore}
    />
  );
}
