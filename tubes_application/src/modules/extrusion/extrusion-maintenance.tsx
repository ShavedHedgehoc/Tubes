import { useExtrusionConveyorStore } from "./store/use-extrusion-conveyor-store";
import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { PostNames } from "@/shared/helpers/post-names";
import ExtrusionMaintenanceContent from "./maintenance/content/extrsuison-maintenance-content";
import ExtrusionMaintenanceMenu from "./maintenance/menu/extrusion-maintenance-menu";
import GenericMaintenancePageLayout from "@/shared/components/layouts/generic-maintenance-page-layout";

export default function ExtrusionMaintenance() {
  return (
    <GenericMaintenancePageLayout
      config={{
        postName: "extrusion",
        postNameTitle: PostNames.EXTRUSION,
        useEmployeeStore: useExtrusionEmployeeStore,
        useConveyorStore: useExtrusionConveyorStore,
        ContentComponent: ExtrusionMaintenanceContent,
        MenuComponent: ExtrusionMaintenanceMenu,
      }}
    />
  );
}
