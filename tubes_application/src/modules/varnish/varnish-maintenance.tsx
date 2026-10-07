import { useVarnishConveyorStore } from "./store/use-varnish-conveyor-store";
import { useVarnishEmployeeStore } from "./store/use-varnish-employee-store";
import { PostNames } from "@/shared/helpers/post-names";
import GenericMaintenancePageLayout from "@/shared/components/layouts/generic-maintenance-page-layout";
import VarnishMaintenanceContent from "./maintenance/content/varnish-maintenance-content";
import VarnishMaintenanceMenu from "./maintenance/menu/varnish-maintenance-menu";

export default function VarnishMaintenance() {
  return (
    <GenericMaintenancePageLayout
      config={{
        postName: "varnish",
        postNameTitle: PostNames.VARNISH,
        useEmployeeStore: useVarnishEmployeeStore,
        useConveyorStore: useVarnishConveyorStore,
        ContentComponent: VarnishMaintenanceContent,
        MenuComponent: VarnishMaintenanceMenu,
      }}
    />
  );
}
