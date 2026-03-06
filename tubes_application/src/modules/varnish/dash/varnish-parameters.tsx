import type { ISummary } from "@/shared/api/services/summary-service";
import { VStack, HStack } from "@chakra-ui/react";
import ParameterCard, {
  type ParameterCardProps,
} from "../../../shared/components/cards/parameter-card";
import { VARNISH_PARAMETER_NAMES } from "@/shared/helpers/parameter-names";
import { PARAMETER_UNITS } from "@/shared/helpers/parameter-units";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import { VarnishInputParams } from "../store/use-varnish-input-store";

export default function VarnishParameters({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  const paramsData = summaryData?.varnishParams ?? null;
  const tresholdsData = summaryData?.tresholds ?? null;

  const varnishMachineSpeedCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.VARNISH_MACHINE_SPEED],
    value: paramsData?.varnish_machine_speed ?? null,
    minValue: tresholdsData?.varnish_varnish_machine_speed_min ?? null,
    maxValue: tresholdsData?.varnish_varnish_machine_speed_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.VARNISH_MACHINE_SPEED],
    variant: "numeric",
  };
  const totalAirPressureCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.TOTAL_AIR_PRESSURE],
    value: paramsData?.total_air_pressure ?? null,
    minValue: tresholdsData?.varnish_total_air_pressure_min ?? null,
    maxValue: tresholdsData?.varnish_total_air_pressure_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.TOTAL_AIR_PRESSURE],
    variant: "numeric",
  };
  const feedCanAirPressureCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.FEED_CAN_AIR_PRESSURE],
    value: paramsData?.feed_can_air_pressure ?? null,
    minValue: tresholdsData?.varnish_feed_can_air_pressure_min ?? null,
    maxValue: tresholdsData?.varnish_feed_can_air_pressure_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.FEED_CAN_AIR_PRESSURE],
    variant: "numeric",
  };
  const nozzleRegulatorAirPressureCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE],
    value: paramsData?.nozzle_regulator_air_pressure ?? null,
    minValue: tresholdsData?.varnish_nozzle_regulator_air_pressure_min ?? null,
    maxValue: tresholdsData?.varnish_nozzle_regulator_air_pressure_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE],
    variant: "numeric",
  };
  const cellsSpeedCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.CELLS_SPEED],
    value: paramsData?.cells_speed ?? null,
    minValue: tresholdsData?.varnish_cells_speed_min ?? null,
    maxValue: tresholdsData?.varnish_cells_speed_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.CELLS_SPEED],
    variant: "numeric",
  };
  const injectionAStartPositionCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_A_START_POSITION],
    value: paramsData?.injection_a_start_position ?? null,
    minValue: tresholdsData?.varnish_injection_a_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_a_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_A_START_POSITION],
    variant: "numeric",
  };
  const injectionBStartPositionCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_B_START_POSITION],
    value: paramsData?.injection_b_start_position ?? null,
    minValue: tresholdsData?.varnish_injection_b_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_b_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_B_START_POSITION],
    variant: "numeric",
  };
  const injectionCStartPositionCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_C_START_POSITION],
    value: paramsData?.injection_c_start_position ?? null,
    minValue: tresholdsData?.varnish_injection_c_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_c_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_C_START_POSITION],
    variant: "numeric",
  };

  const injectionDStartPositionCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_D_START_POSITION],
    value: paramsData?.injection_d_start_position ?? null,
    minValue: tresholdsData?.varnish_injection_d_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_d_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_D_START_POSITION],
    variant: "numeric",
  };
  const injectionAEndPositionCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_A_END_POSITION],
    value: paramsData?.injection_a_end_position ?? null,
    minValue: tresholdsData?.varnish_injection_a_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_a_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_A_END_POSITION],
    variant: "numeric",
  };
  const injectionBEndPositionCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_B_END_POSITION],
    value: paramsData?.injection_b_end_position ?? null,
    minValue: tresholdsData?.varnish_injection_b_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_b_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_B_END_POSITION],
    variant: "numeric",
  };
  const injectionCEndPositionCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_C_END_POSITION],
    value: paramsData?.injection_c_end_position ?? null,
    minValue: tresholdsData?.varnish_injection_c_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_c_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_C_END_POSITION],
    variant: "numeric",
  };

  const injectionDEndPositionCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_D_END_POSITION],
    value: paramsData?.injection_d_end_position ?? null,
    minValue: tresholdsData?.varnish_injection_d_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_d_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_D_END_POSITION],
    variant: "numeric",
  };
  const tubeMoldingStartPositionCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.TUBE_MOLDING_START_POSITION],
    value: paramsData?.tube_molding_start_position ?? null,
    minValue: tresholdsData?.varnish_tube_molding_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_tube_molding_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.TUBE_MOLDING_START_POSITION],
    variant: "numeric",
  };
  const tubeMoldingEndPositionCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.TUBE_MOLDING_END_POSITION],
    value: paramsData?.tube_molding_end_position ?? null,
    minValue: tresholdsData?.varnish_tube_molding_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_tube_molding_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.TUBE_MOLDING_END_POSITION],
    variant: "numeric",
  };
  const polimerizationFurnaceTempCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.POLIMERIZATION_FURNACE_TEMP],
    value: paramsData?.polimerization_furnace_temp ?? null,
    minValue: tresholdsData?.varnish_polimerization_furnace_temp_min ?? null,
    maxValue: tresholdsData?.varnish_polimerization_furnace_temp_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.POLIMERIZATION_FURNACE_TEMP],
    variant: "numeric",
  };
  const internalVarnishPorosityCardProps: ParameterCardProps = {
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INTERNAL_VARNISH_POROSITY],
    value: paramsData?.internal_varnish_porosity ?? null,
    minValue: tresholdsData?.varnish_internal_varnish_porosity_min ?? null,
    maxValue: tresholdsData?.varnish_internal_varnish_porosity_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INTERNAL_VARNISH_POROSITY],
    variant: "numeric",
  };

  const internalSectionalViewCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INTERNAL_SECTIONAL_VIEW],
    booleanValue: paramsData?.internal_sectional_view ?? null,
    variant: "boolean",
  };
  const aluminiumClearanceLackCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.ALUMINIUM_CLEARANCE_LACK],
    booleanValue: paramsData?.aluminium_clearance_lack ?? null,
    variant: "boolean",
  };
  const unpaintingLackCardProps: ParameterCardProps = {
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.UNPAINTING_LACK],
    booleanValue: paramsData?.unpainting_lack ?? null,
    variant: "boolean",
  };

  if (!tresholdsData)
    return <NotFound message={AppMessages.PARAMS_NOT_FOUND} />;

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...varnishMachineSpeedCardProps} />
        <ParameterCard {...totalAirPressureCardProps} />
        <ParameterCard {...feedCanAirPressureCardProps} />
        <ParameterCard {...nozzleRegulatorAirPressureCardProps} />
        <ParameterCard {...cellsSpeedCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...injectionAStartPositionCardProps} />
        <ParameterCard {...injectionBStartPositionCardProps} />
        <ParameterCard {...injectionCStartPositionCardProps} />
        <ParameterCard {...injectionDStartPositionCardProps} />
        <ParameterCard {...injectionAEndPositionCardProps} />
        <ParameterCard {...injectionBEndPositionCardProps} />
        <ParameterCard {...injectionCEndPositionCardProps} />
        <ParameterCard {...injectionDEndPositionCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...tubeMoldingStartPositionCardProps} />
        <ParameterCard {...tubeMoldingEndPositionCardProps} />
        <ParameterCard {...polimerizationFurnaceTempCardProps} />
        <ParameterCard {...internalVarnishPorosityCardProps} />
        <ParameterCard {...internalSectionalViewCardProps} />
        <ParameterCard {...aluminiumClearanceLackCardProps} />
        <ParameterCard {...unpaintingLackCardProps} />
      </HStack>
    </VStack>
  );
}
