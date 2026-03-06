import { useShallow } from "zustand/react/shallow";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import {
  useSealantAuthModalStore,
  useSealantMaterialScanModalStore,
  useSealantLogoutModalStore,
  useSealantCloseSummaryModalStore,
} from "../../store/use-sealant-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useNavigate } from "react-router-dom";
import {
  SealantInputParams,
  useSealantInputStore,
} from "../../store/use-sealant-input-store";
import { RouteNames } from "@/shared/router/route-names";

export default function useSealantMenu() {
  const employee = useSealantEmployeeStore(
    useShallow((state) => state.sealantEmployee),
  );
  const sealantConveyor = useSealantConveyorStore(
    useShallow((state) => state.sealantConveyor),
  );
  const { data: summaryData } = useActiveSummary(sealantConveyor?.id ?? null);
  const setOpenAuth = useSealantAuthModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenMaterialScan = useSealantMaterialScanModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenLogout = useSealantLogoutModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenCloseSummary = useSealantCloseSummaryModalStore(
    useShallow((state) => state.setOpen),
  );

  const navigate = useNavigate();
  const setData = useSealantInputStore(useShallow((state) => state.setData));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.sealantStatus.idle ||
    !summaryData.sealant_materials.length ||
    summaryData.sealantStatus.finished ||
    !summaryData.tresholds ||
    summaryData.sealant_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.sealantStatus.finished ||
    summaryData.sealantStatus.idle ||
    !summaryData.tresholds;

  const operationButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.sealantStatus.createdAt ||
    summaryData.sealantStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.sealantStatus.createdAt ||
    summaryData.sealantStatus.idle ||
    summaryData.sealantStatus.finished;

  const printButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.sealantStatus.idle ||
    summaryData.sealantStatus.finished ||
    summaryData.sealant_materials.map((item) => item.scanned).includes(false);

  const handleOpenParametersClick = () => {
    const params = summaryData?.sealantParams ?? null;

    const capMachineSpeed = String(params?.cap_machine_speed ?? "0");
    const totalAirPressure = String(params?.total_air_pressure ?? "0");
    const holdersForward = String(params?.holders_forward ?? "0");
    const holdersOpeningLeft = String(params?.holders_opening_left ?? "0");
    const holdersOpeningRight = String(params?.holders_opening_right ?? "0");
    const holdersClosing = String(params?.holders_closing ?? "0");
    const injectionTubeOrientationStart = String(
      params?.injection_tube_orientation_start ?? "0",
    );
    const injectionTubeOrientationEnd = String(
      params?.injection_tube_orientation_end ?? "0",
    );

    setData({
      key: SealantInputParams.CAP_MACHINE_SPEED,
      value: capMachineSpeed,
    });
    setData({
      key: SealantInputParams.TOTAL_AIR_PRESSURE,
      value: totalAirPressure,
    });
    setData({ key: SealantInputParams.HOLDERS_FORWARD, value: holdersForward });
    setData({
      key: SealantInputParams.HOLDERS_OPENING_LEFT,
      value: holdersOpeningLeft,
    });
    setData({
      key: SealantInputParams.HOLDERS_OPENING_RIGHT,
      value: holdersOpeningRight,
    });
    setData({ key: SealantInputParams.HOLDERS_CLOSING, value: holdersClosing });
    setData({
      key: SealantInputParams.INJECTION_TUBE_ORIENTATION_START,
      value: injectionTubeOrientationStart,
    });
    setData({
      key: SealantInputParams.INJECTION_TUBE_ORIENTATION_END,
      value: injectionTubeOrientationEnd,
    });

    navigate(`${RouteNames.SEALANT_ADD_ENTRY_ROOT}/${sealantConveyor?.name}`);
  };
  return {
    employee,
    sealantConveyor,
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
    printButtonDisabledCondition,
  };
}
