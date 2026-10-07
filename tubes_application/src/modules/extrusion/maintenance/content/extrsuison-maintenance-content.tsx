import type { ISummary } from "@/shared/api/services/summary-service";
import useExtrusionMaintenanceContent from "./use-extrusion-maintenance-content";
import { useExtrusionMaintenanceModalStore } from "../../store/use-extrusion-modal-store";
import MaintenancePostContent from "@/shared/components/layouts/maintenance-post-content-layout";
export default function ExtrusionMaintenanceContent({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  return (
    <MaintenancePostContent
      summaryData={summaryData}
      type="extrusion"
      useContentHook={useExtrusionMaintenanceContent}
      useModalStore={useExtrusionMaintenanceModalStore}
    />
  );
}
