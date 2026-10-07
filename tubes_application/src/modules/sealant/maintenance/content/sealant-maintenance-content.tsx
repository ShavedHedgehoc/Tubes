import type { ISummary } from "@/shared/api/services/summary-service";
import useSealantMaintenanceContent from "./use-sealant-maintenance-content";
import { useSealantMaintenanceModalStore } from "../../store/use-sealant-modal-store";
import MaintenancePostContent from "@/shared/components/layouts/maintenance-post-content-layout";
export function SealantMaintenanceContent({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostContent
      summaryData={summaryData}
      type="sealant"
      useContentHook={useSealantMaintenanceContent}
      useModalStore={useSealantMaintenanceModalStore}
    />
  );
}
