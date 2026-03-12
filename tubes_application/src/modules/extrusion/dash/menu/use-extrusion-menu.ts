import { useShallow } from "zustand/react/shallow";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import {
  useExtrusionAuthModalStore,
  useExtrusionMaterialScanModalStore,
  useExtrusionLogoutModalStore,
  useExtrusionCloseSummaryModalStore,
} from "../../store/use-extrusion-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import {
  ExtrusionInputParams,
  useExtrusionInputStore,
} from "../../store/use-extrusion-input-store";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";

export default function useExtrusionMenu() {
  const employee = useExtrusionEmployeeStore(
    useShallow((state) => state.extrusionEmployee),
  );
  const extrusionConveyor = useExtrusionConveyorStore(
    useShallow((state) => state.extrusionConveyor),
  );
  const { data: summaryData } = useActiveSummary(extrusionConveyor?.id ?? null);
  const setOpenAuth = useExtrusionAuthModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenMaterialScan = useExtrusionMaterialScanModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenLogout = useExtrusionLogoutModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenCloseSummary = useExtrusionCloseSummaryModalStore(
    useShallow((state) => state.setOpen),
  );

  const navigate = useNavigate();
  const setData = useExtrusionInputStore(useShallow((state) => state.setData));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.extrusionStatus.idle ||
    !summaryData.extrusion_materials.length ||
    summaryData.extrusionStatus.finished ||
    !summaryData.tresholds ||
    summaryData.extrusion_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.extrusionStatus.finished ||
    summaryData.extrusionStatus.idle ||
    !summaryData.tresholds;

  const operationButtonDisabledCondition =
    !employee ||
    !summaryData ||
    // !summaryData.extrusionStatus.createdAt ||
    summaryData.extrusionStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.extrusionStatus.createdAt ||
    summaryData.extrusionStatus.idle ||
    summaryData.extrusionStatus.finished;

  const handleOpenParametersClick = () => {
    const params = summaryData?.extrusionParams ?? null;

    const pressSpeed = String(params?.press_speed ?? "0");
    const blowTime = String(params?.blow_time ?? "0");
    const turningMachineSpeed = String(params?.turning_machine_speed ?? "0");
    // const annealingFurnaceTemp = String(params?.annealing_furnace_temp ?? "0");
    // const tubeCylindricalSectionLength = String(params?.tube_cylindrical_section_length ?? "0");
    // const membraneThickness = String(params?.membrane_thickness ?? "0");
    const tubeDiameter = String(params?.tube_diameter ?? "0");
    // const tubeCylindricalSectionThickness = String(params?.tube_cylindrical_section_thickness ?? "0");
    // const tubeRigidity = String(params?.tube_rigidity ?? "0");

    setData({ key: ExtrusionInputParams.PRESS_SPEED, value: pressSpeed });
    setData({ key: ExtrusionInputParams.BLOW_TIME, value: blowTime });
    setData({
      key: ExtrusionInputParams.TURNING_MACHINE_SPEED,
      value: turningMachineSpeed,
    });

    // setData({ key: ExtrusionInputParams.ANNEALING_FURNACE_TEMP, value: annealingFurnaceTemp })
    // setData({ key: ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH, value: tubeCylindricalSectionLength })
    // setData({ key: ExtrusionInputParams.MEMBRANE_THICKNESS, value: membraneThickness })
    setData({ key: ExtrusionInputParams.TUBE_DIAMETER, value: tubeDiameter });
    // setData({ key: ExtrusionInputParams.TUBE_CYLINDRICAL_THICKNESS, value: tubeCylindricalSectionThickness })
    // setData({ key: ExtrusionInputParams.TUBE_RIGIDITY, value: tubeRigidity })
    navigate(
      `${RouteNames.EXTRUSION_ADD_ENTRY_ROOT}/${extrusionConveyor?.name}`,
    );
  };

  return {
    employee,
    extrusionConveyor,
    setOpenAuth,
    setOpenLogout,
    setOpenMaterialScan,
    setOpenCloseSummary,
    handleOpenParametersClick,
    inputParametersButtonDisabledCondition,
    scanMaterialsButtonDisabledCondition,
    operationButtonDisabledCondition,
    pictureButtonDisabledCondition,
    endButtonDisabledCondition,
  };
}
