import { useSealantConveyorStore } from "./store/use-sealant-conveyor-store";
import { useSealantEmployeeStore } from "./store/use-sealant-employee-store";
import { PostNames } from "@/shared/helpers/post-names";
import GenericMaintenancePageLayout from "@/shared/components/layouts/generic-maintenance-page-layout";
import { SealantMaintenanceMenu } from "./maintenance";
import { SealantMaintenanceContent } from "./maintenance";

export default function SealantMaintenance() {
  return (
    <GenericMaintenancePageLayout
      config={{
        postName: "sealant",
        postNameTitle: PostNames.SEALANT,
        useEmployeeStore: useSealantEmployeeStore,
        useConveyorStore: useSealantConveyorStore,
        ContentComponent: SealantMaintenanceContent,
        MenuComponent: SealantMaintenanceMenu,
      }}
    />
  );
}
