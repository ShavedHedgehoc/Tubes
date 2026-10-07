import { useOffsetConveyorStore } from "./store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "./store/use-offset-employee-store";
import { PostNames } from "@/shared/helpers/post-names";
import GenericMaintenancePageLayout from "@/shared/components/layouts/generic-maintenance-page-layout";
import OffsetMaintenanceContent from "./maintenance/content/offset-maintenance-content";
import OffsetMaintenanceMenu from "./maintenance/menu/offset-maintenance-menu";

export default function OffsetMaintenance() {
  return (
    <GenericMaintenancePageLayout
      config={{
        postName: "offset",
        postNameTitle: PostNames.OFFSET,
        useEmployeeStore: useOffsetEmployeeStore,
        useConveyorStore: useOffsetConveyorStore,
        ContentComponent: OffsetMaintenanceContent,
        MenuComponent: OffsetMaintenanceMenu,
      }}
    />
  );
}
