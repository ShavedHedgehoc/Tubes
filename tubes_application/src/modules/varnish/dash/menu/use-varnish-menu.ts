import { useShallow } from "zustand/react/shallow";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import {
  useVarnishAuthModalStore,
  useVarnishMaterialScanModalStore,
  useVarnishLogoutModalStore,
  useVarnishCloseSummaryModalStore,
} from "../../store/use-varnish-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useNavigate } from "react-router-dom";
import {
  useVarnishInputStore,
  VarnishInputParams,
} from "../../store/use-varnish-input-store";
import { RouteNames } from "@/shared/router/route-names";

export default function useVarnishMenu() {
  const employee = useVarnishEmployeeStore(
    useShallow((state) => state.varnishEmployee),
  );
  const varnishConveyor = useVarnishConveyorStore(
    useShallow((state) => state.varnishConveyor),
  );
  const { data: summaryData } = useActiveSummary(varnishConveyor?.id ?? null);
  const setOpenAuth = useVarnishAuthModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenMaterialScan = useVarnishMaterialScanModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenLogout = useVarnishLogoutModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenCloseSummary = useVarnishCloseSummaryModalStore(
    useShallow((state) => state.setOpen),
  );

  const navigate = useNavigate();
  const setData = useVarnishInputStore(useShallow((state) => state.setData));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.varnishStatus.idle ||
    !summaryData.varnish_materials.length ||
    summaryData.varnishStatus.finished ||
    !summaryData.tresholds ||
    summaryData.varnish_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.varnishStatus.finished ||
    summaryData.varnishStatus.idle ||
    !summaryData.tresholds;

  const operationButtonDisabledCondition =
    !employee ||
    !summaryData ||
    // !summaryData.varnishStatus.createdAt ||
    summaryData.varnishStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.varnishStatus.createdAt ||
    summaryData.varnishStatus.idle ||
    summaryData.varnishStatus.finished;

  const handleOpenParametersClick = () => {
    const params = summaryData?.varnishParams ?? null;

    const varnishMachineSpeed = String(params?.varnish_machine_speed ?? "0");
    const totalAirPressure = String(params?.total_air_pressure ?? "0");
    const feedCanAirPressure = String(params?.feed_can_air_pressure ?? "0");
    const nozzleRegulatorAirPressure = String(
      params?.nozzle_regulator_air_pressure ?? "0",
    );
    const cellsSpeed = String(params?.cells_speed ?? "0");
    const injectionAEndPosition = String(
      params?.injection_a_end_position ?? "0",
    );
    const injectionBEndPosition = String(
      params?.injection_b_end_position ?? "0",
    );
    const injectionCEndPosition = String(
      params?.injection_c_end_position ?? "0",
    );
    const injectionDEndPosition = String(
      params?.injection_d_end_position ?? "0",
    );
    const tubeMoldingStartPosition = String(
      params?.tube_molding_start_position ?? "0",
    );
    const tubeMoldingEndPosition = String(
      params?.tube_molding_end_position ?? "0",
    );

    setData({
      key: VarnishInputParams.VARNISH_MACHINE_SPEED,
      value: varnishMachineSpeed,
    });
    setData({
      key: VarnishInputParams.TOTAL_AIR_PRESSURE,
      value: totalAirPressure,
    });
    setData({
      key: VarnishInputParams.FEED_CAN_AIR_PRESSURE,
      value: feedCanAirPressure,
    });
    setData({
      key: VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE,
      value: nozzleRegulatorAirPressure,
    });
    setData({ key: VarnishInputParams.CELLS_SPEED, value: cellsSpeed });
    setData({
      key: VarnishInputParams.INJECTION_A_END_POSITION,
      value: injectionAEndPosition,
    });
    setData({
      key: VarnishInputParams.INJECTION_B_END_POSITION,
      value: injectionBEndPosition,
    });
    setData({
      key: VarnishInputParams.INJECTION_C_END_POSITION,
      value: injectionCEndPosition,
    });
    setData({
      key: VarnishInputParams.INJECTION_D_END_POSITION,
      value: injectionDEndPosition,
    });
    setData({
      key: VarnishInputParams.TUBE_MOLDING_START_POSITION,
      value: tubeMoldingStartPosition,
    });
    setData({
      key: VarnishInputParams.TUBE_MOLDING_END_POSITION,
      value: tubeMoldingEndPosition,
    });

    navigate(`${RouteNames.VARNISH_ADD_ENTRY_ROOT}/${varnishConveyor?.name}`);
  };

  return {
    employee,
    varnishConveyor,
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
