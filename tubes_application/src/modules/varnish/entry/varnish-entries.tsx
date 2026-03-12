import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { VARNISH_PARAMETER_NAMES } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";
import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { PARAMETER_UNITS } from "@/shared/helpers/parameter-units";
import {
  useVarnishInputStore,
  VarnishInputParams,
} from "../store/use-varnish-input-store";
import useVarnishEntriesHandleCardsClick from "./use-varnish-entries-handle-cards-click";
import { parseValue } from "@/shared/helpers/parse-value";

export default function VarnishEntries({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  const data = useVarnishInputStore(useShallow((state) => state.data));
  const { handleCardClick, handleIntegerCardClick, handleBooleanCardClick } =
    useVarnishEntriesHandleCardsClick();

  const tresholdsData = summaryData?.tresholds ?? null;

  const lastCounterValue = summaryData?.varnishParams
    ? summaryData.varnishParams.counter_value
    : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: VarnishInputParams.COUNTER_VALUE,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.COUNTER_VALUE],
    value: parseValue(data.counter_value),
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: PARAMETER_UNITS[VarnishInputParams.COUNTER_VALUE],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const varnishMachineSpeedCardProps: AddParameterCardProps = {
    id: VarnishInputParams.VARNISH_MACHINE_SPEED,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.VARNISH_MACHINE_SPEED],
    value: parseValue(data.varnish_machine_speed),
    minValue: tresholdsData?.varnish_varnish_machine_speed_min ?? null,
    maxValue: tresholdsData?.varnish_varnish_machine_speed_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.VARNISH_MACHINE_SPEED],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const totalAirpressureCardProps: AddParameterCardProps = {
    id: VarnishInputParams.TOTAL_AIR_PRESSURE,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.TOTAL_AIR_PRESSURE],
    value: parseValue(data.total_air_pressure),
    minValue: tresholdsData?.varnish_total_air_pressure_min ?? null,
    maxValue: tresholdsData?.varnish_total_air_pressure_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.TOTAL_AIR_PRESSURE],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const feedCanAirpressureCardProps: AddParameterCardProps = {
    id: VarnishInputParams.FEED_CAN_AIR_PRESSURE,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.FEED_CAN_AIR_PRESSURE],
    value: parseValue(data.feed_can_air_pressure),
    minValue: tresholdsData?.varnish_feed_can_air_pressure_min ?? null,
    maxValue: tresholdsData?.varnish_feed_can_air_pressure_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.FEED_CAN_AIR_PRESSURE],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const nozzleRegulatorAirpressureCardProps: AddParameterCardProps = {
    id: VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE],
    value: parseValue(data.nozzle_regulator_air_pressure),
    minValue: tresholdsData?.varnish_nozzle_regulator_air_pressure_min ?? null,
    maxValue: tresholdsData?.varnish_nozzle_regulator_air_pressure_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const cellsSpeedCardProps: AddParameterCardProps = {
    id: VarnishInputParams.CELLS_SPEED,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.CELLS_SPEED],
    value: parseValue(data.cells_speed),
    minValue: tresholdsData?.varnish_cells_speed_min ?? null,
    maxValue: tresholdsData?.varnish_cells_speed_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.CELLS_SPEED],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionAStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_A_START_POSITION,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_A_START_POSITION],
    value: parseValue(data.injection_a_start_position),
    minValue: tresholdsData?.varnish_injection_a_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_a_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_A_START_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionBStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_B_START_POSITION,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_B_START_POSITION],
    value: parseValue(data.injection_b_start_position),
    minValue: tresholdsData?.varnish_injection_b_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_b_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_B_START_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionCStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_C_START_POSITION,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_C_START_POSITION],
    value: parseValue(data.injection_c_start_position),
    minValue: tresholdsData?.varnish_injection_c_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_c_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_C_START_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionDStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_D_START_POSITION,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_D_START_POSITION],
    value: parseValue(data.injection_d_start_position),
    minValue: tresholdsData?.varnish_injection_d_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_d_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_D_START_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionAEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_A_END_POSITION,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_A_END_POSITION],
    value: parseValue(data.injection_a_end_position),
    minValue: tresholdsData?.varnish_injection_a_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_a_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_A_END_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionBEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_B_END_POSITION,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_B_END_POSITION],
    value: parseValue(data.injection_b_end_position),
    minValue: tresholdsData?.varnish_injection_b_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_b_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_B_END_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionCEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_C_END_POSITION,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_C_END_POSITION],
    value: parseValue(data.injection_c_end_position),
    minValue: tresholdsData?.varnish_injection_c_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_c_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_C_END_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionDEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_D_END_POSITION,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INJECTION_D_END_POSITION],
    value: parseValue(data.injection_d_end_position),
    minValue: tresholdsData?.varnish_injection_d_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_injection_d_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INJECTION_D_END_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const tubeMoldingStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.TUBE_MOLDING_START_POSITION,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.TUBE_MOLDING_START_POSITION],
    value: parseValue(data.tube_molding_start_position),
    minValue: tresholdsData?.varnish_tube_molding_start_position_min ?? null,
    maxValue: tresholdsData?.varnish_tube_molding_start_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.TUBE_MOLDING_START_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const tubeMoldingEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.TUBE_MOLDING_END_POSITION,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.TUBE_MOLDING_END_POSITION],
    value: parseValue(data.tube_molding_end_position),
    minValue: tresholdsData?.varnish_tube_molding_end_position_min ?? null,
    maxValue: tresholdsData?.varnish_tube_molding_end_position_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.TUBE_MOLDING_END_POSITION],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const polimerizationFurnaceTempCardProps: AddParameterCardProps = {
    id: VarnishInputParams.POLIMERIZATION_FURNACE_TEMP,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.POLIMERIZATION_FURNACE_TEMP],
    value: parseValue(data.polimerization_furnace_temp),
    minValue: tresholdsData?.varnish_polimerization_furnace_temp_min ?? null,
    maxValue: tresholdsData?.varnish_polimerization_furnace_temp_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.POLIMERIZATION_FURNACE_TEMP],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const internalVarnishPorosityCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INTERNAL_VARNISH_POROSITY,
    title:
      VARNISH_PARAMETER_NAMES[VarnishInputParams.INTERNAL_VARNISH_POROSITY],
    value: parseValue(data.internal_varnish_porosity),
    minValue: tresholdsData?.varnish_internal_varnish_porosity_min ?? null,
    maxValue: tresholdsData?.varnish_internal_varnish_porosity_max ?? null,
    unit: PARAMETER_UNITS[VarnishInputParams.INTERNAL_VARNISH_POROSITY],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const internalSectionalViewCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INTERNAL_SECTIONAL_VIEW,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.INTERNAL_SECTIONAL_VIEW],
    booleanValue: data.internal_sectional_view ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  const aluminiumClearanceLackCardProps: AddParameterCardProps = {
    id: VarnishInputParams.ALUMINIUM_CLEARANCE_LACK,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.ALUMINIUM_CLEARANCE_LACK],
    booleanValue: data.aluminium_clearance_lack ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  const unpaintingLackCardProps: AddParameterCardProps = {
    id: VarnishInputParams.UNPAINTING_LACK,
    title: VARNISH_PARAMETER_NAMES[VarnishInputParams.UNPAINTING_LACK],
    booleanValue: data.unpainting_lack ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...varnishMachineSpeedCardProps} />
        <AddParameterCard {...totalAirpressureCardProps} />
        <AddParameterCard {...feedCanAirpressureCardProps} />
        <AddParameterCard {...nozzleRegulatorAirpressureCardProps} />
        <AddParameterCard {...cellsSpeedCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...injectionAStartPositionCardProps} />
        <AddParameterCard {...injectionAEndPositionCardProps} />
        <AddParameterCard {...injectionBStartPositionCardProps} />
        <AddParameterCard {...injectionBEndPositionCardProps} />
        <AddParameterCard {...injectionCStartPositionCardProps} />
        <AddParameterCard {...injectionCEndPositionCardProps} />
        <AddParameterCard {...injectionDStartPositionCardProps} />
        <AddParameterCard {...injectionDEndPositionCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...tubeMoldingStartPositionCardProps} />
        <AddParameterCard {...tubeMoldingEndPositionCardProps} />
        <AddParameterCard {...polimerizationFurnaceTempCardProps} />
        <AddParameterCard {...internalVarnishPorosityCardProps} />
        <AddParameterCard {...internalSectionalViewCardProps} />
        <AddParameterCard {...aluminiumClearanceLackCardProps} />
        <AddParameterCard {...unpaintingLackCardProps} />
      </HStack>
    </VStack>
  );
}
