import { useShallow } from "zustand/react/shallow";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import {
  useOffsetAuthModalStore,
  useOffsetMaterialScanModalStore,
  useOffsetLogoutModalStore,
  useOffsetCloseSummaryModalStore,
} from "../../store/use-offset-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useNavigate } from "react-router-dom";
import { useOffsetInputStore } from "../../store/use-offset-input-store";
import { RouteNames } from "@/shared/router/route-names";
import { OffsetInputParams } from "../../store/use-offset-input-store";

export default function useOffsetMenu() {
  const employee = useOffsetEmployeeStore(
    useShallow((state) => state.offsetEmployee),
  );
  const offsetConveyor = useOffsetConveyorStore(
    useShallow((state) => state.offsetConveyor),
  );
  const { data: summaryData } = useActiveSummary(offsetConveyor?.id ?? null);
  const setOpenAuth = useOffsetAuthModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenMaterialScan = useOffsetMaterialScanModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenLogout = useOffsetLogoutModalStore(
    useShallow((state) => state.setOpen),
  );
  const setOpenCloseSummary = useOffsetCloseSummaryModalStore(
    useShallow((state) => state.setOpen),
  );

  const navigate = useNavigate();
  const setData = useOffsetInputStore(useShallow((state) => state.setData));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.offsetStatus.idle ||
    !summaryData.offset_materials.length ||
    summaryData.offsetStatus.finished ||
    !summaryData.tresholds ||
    summaryData.offset_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.offsetStatus.finished ||
    summaryData.offsetStatus.idle ||
    !summaryData.tresholds;

  const operationButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.offsetStatus.createdAt ||
    summaryData.offsetStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.offsetStatus.createdAt ||
    summaryData.offsetStatus.idle ||
    summaryData.offsetStatus.finished;

  const handleOpenParametersClick = () => {
    const params = summaryData?.offsetParams ?? null;

    const printingMachineSpeed = String(params?.printing_machine_speed ?? "0");
    const totalAirPressure = String(params?.total_air_pressure ?? "0");
    const printerMotor = String(params?.printer_motor ?? "0");
    const baseCoversHoldersMotor = String(
      params?.base_covers_holders_motor ?? "0",
    );
    const baseCoversStationMotor = String(
      params?.base_covers_station_motor ?? "0",
    );
    const imprintQuantityPrintedBox1 = String(
      params?.imprint_quantity_printed_box_1 ?? "0",
    );
    const imprintQuantityPrintedBox2 = String(
      params?.imprint_quantity_printed_box_2 ?? "0",
    );
    const imprintQuantityPrintedBox3 = String(
      params?.imprint_quantity_printed_box_3 ?? "0",
    );
    const imprintQuantityPrintedBox4 = String(
      params?.imprint_quantity_printed_box_4 ?? "0",
    );
    const imprintQuantityPrintedBox5 = String(
      params?.imprint_quantity_printed_box_5 ?? "0",
    );
    const imprintQuantityPrintedBox6 = String(
      params?.imprint_quantity_printed_box_6 ?? "0",
    );

    setData({
      key: OffsetInputParams.PRINTING_MACHINE_SPEED,
      value: printingMachineSpeed,
    });
    setData({
      key: OffsetInputParams.TOTAL_AIR_PRESSURE,
      value: totalAirPressure,
    });
    setData({ key: OffsetInputParams.PRINTER_MOTOR, value: printerMotor });
    setData({
      key: OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR,
      value: baseCoversHoldersMotor,
    });
    setData({
      key: OffsetInputParams.BASE_COVERS_STATION_MOTOR,
      value: baseCoversStationMotor,
    });
    setData({
      key: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1,
      value: imprintQuantityPrintedBox1,
    });
    setData({
      key: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2,
      value: imprintQuantityPrintedBox2,
    });
    setData({
      key: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3,
      value: imprintQuantityPrintedBox3,
    });
    setData({
      key: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4,
      value: imprintQuantityPrintedBox4,
    });
    setData({
      key: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5,
      value: imprintQuantityPrintedBox5,
    });
    setData({
      key: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6,
      value: imprintQuantityPrintedBox6,
    });

    navigate(`${RouteNames.OFFSET_ADD_ENTRY_ROOT}/${offsetConveyor?.name}`);
  };

  return {
    employee,
    offsetConveyor,
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
