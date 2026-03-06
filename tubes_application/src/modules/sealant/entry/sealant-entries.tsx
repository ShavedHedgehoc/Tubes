import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { SEALANT_PARAMETER_NAMES } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";
import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { PARAMETER_UNITS } from "@/shared/helpers/parameter-units";
import {
  useSealantInputStore,
  SealantInputParams,
} from "../store/use-sealant-input-store";
import useSealantEntriesHandleCardsClick from "./use-sealant-entries-handle-cards-click";

export default function SealantEntries({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  const data = useSealantInputStore(useShallow((state) => state.data));
  const { handleCardClick, handleIntegerCardClick, handleBooleanCardClick } =
    useSealantEntriesHandleCardsClick();

  const tresholdsData = summaryData?.tresholds || null;
  const lastCounterValue = summaryData?.sealantParams
    ? summaryData.sealantParams.counter_value
    : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: SealantInputParams.COUNTER_VALUE,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.COUNTER_VALUE],
    value: Number(data.counter_value) || null,
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: PARAMETER_UNITS[SealantInputParams.COUNTER_VALUE],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const capMachineSpeedCardProps: AddParameterCardProps = {
    id: SealantInputParams.CAP_MACHINE_SPEED,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.CAP_MACHINE_SPEED],
    value: Number(data.cap_machine_speed) || null,
    minValue: tresholdsData?.sealant_cap_machine_speed_min || null,
    maxValue: tresholdsData?.sealant_cap_machine_speed_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.CAP_MACHINE_SPEED],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const totalAirPressureCardProps: AddParameterCardProps = {
    id: SealantInputParams.TOTAL_AIR_PRESSURE,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.TOTAL_AIR_PRESSURE],
    value: Number(data.total_air_pressure) || null,
    minValue: tresholdsData?.sealant_total_air_pressure_min || null,
    maxValue: tresholdsData?.sealant_total_air_pressure_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.TOTAL_AIR_PRESSURE],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const holdersForwardCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_FORWARD,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.HOLDERS_FORWARD],
    value: Number(data.holders_forward) || null,
    minValue: tresholdsData?.sealant_holders_forward_min || null,
    maxValue: tresholdsData?.sealant_holders_forward_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.HOLDERS_FORWARD],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const holdersOpeningLeftCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_OPENING_LEFT,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.HOLDERS_OPENING_LEFT],
    value: Number(data.holders_opening_left) || null,
    minValue: tresholdsData?.sealant_holders_opening_left_min || null,
    maxValue: tresholdsData?.sealant_holders_opening_left_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.HOLDERS_OPENING_LEFT],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const holdersOpeningRightCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_OPENING_RIGHT,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.HOLDERS_OPENING_RIGHT],
    value: Number(data.holders_opening_right) || null,
    minValue: tresholdsData?.sealant_holders_opening_right_min || null,
    maxValue: tresholdsData?.sealant_holders_opening_right_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.HOLDERS_OPENING_RIGHT],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const holdersClosingCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_CLOSING,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.HOLDERS_CLOSING],
    value: Number(data.holders_closing) || null,
    minValue: tresholdsData?.sealant_holders_closing_min || null,
    maxValue: tresholdsData?.sealant_holders_closing_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.HOLDERS_CLOSING],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionAStartCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_A_START,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.INJECTION_A_START],
    value: Number(data.injection_a_start) || null,
    minValue: tresholdsData?.sealant_injection_a_start_min || null,
    maxValue: tresholdsData?.sealant_injection_a_start_max || null,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionBStartCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_B_START,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.INJECTION_B_START],
    value: Number(data.injection_b_start) || null,
    minValue: tresholdsData?.sealant_injection_b_start_min || null,
    maxValue: tresholdsData?.sealant_injection_b_start_max || null,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionAEndCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_A_END,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.INJECTION_A_END],
    value: Number(data.injection_a_end) || null,
    minValue: tresholdsData?.sealant_injection_a_end_min || null,
    maxValue: tresholdsData?.sealant_injection_a_end_max || null,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionBEndCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_B_END,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.INJECTION_B_END],
    value: Number(data.injection_b_end) || null,
    minValue: tresholdsData?.sealant_injection_b_end_min || null,
    maxValue: tresholdsData?.sealant_injection_b_end_max || null,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionTubeOrientationStartCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_TUBE_ORIENTATION_START,
    title:
      SEALANT_PARAMETER_NAMES[
        SealantInputParams.INJECTION_TUBE_ORIENTATION_START
      ],
    value: Number(data.injection_tube_orientation_start) || null,
    minValue:
      tresholdsData?.sealant_injection_tube_orientation_start_min || null,
    maxValue:
      tresholdsData?.sealant_injection_tube_orientation_start_max || null,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionTubeOrientationEndCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_TUBE_ORIENTATION_END,
    title:
      SEALANT_PARAMETER_NAMES[
        SealantInputParams.INJECTION_TUBE_ORIENTATION_END
      ],
    value: Number(data.injection_tube_orientation_end) || null,
    minValue: tresholdsData?.sealant_injection_tube_orientation_end_min || null,
    maxValue: tresholdsData?.sealant_injection_tube_orientation_end_max || null,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const isCapSurfaceSmoothCardProps: AddParameterCardProps = {
    id: SealantInputParams.IS_CAP_SURFACE_SMOOTH,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.IS_CAP_SURFACE_SMOOTH],
    booleanValue: data.is_cap_surface_smooth || null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const latexRingPaddingCardProps: AddParameterCardProps = {
    id: SealantInputParams.LATEX_RING_PADDING,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.LATEX_RING_PADDING],
    value: Number(data.latex_ring_padding) || null,
    minValue: tresholdsData?.sealant_latex_ring_padding_min || null,
    maxValue: tresholdsData?.sealant_latex_ring_padding_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.LATEX_RING_PADDING],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const latexRingWidthCardProps: AddParameterCardProps = {
    id: SealantInputParams.LATEX_RING_WIDTH,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.LATEX_RING_WIDTH],
    value: Number(data.latex_ring_width) || null,
    minValue: tresholdsData?.sealant_latex_ring_width_min || null,
    maxValue: tresholdsData?.sealant_latex_ring_width_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.LATEX_RING_WIDTH],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const tubeRigidityCardProps: AddParameterCardProps = {
    id: SealantInputParams.TUBE_RIGIDITY,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.TUBE_RIGIDITY],
    value: Number(data.tube_rigidity) || null,
    minValue: tresholdsData?.sealant_tube_rigidity_min || null,
    maxValue: tresholdsData?.sealant_tube_rigidity_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.TUBE_RIGIDITY],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const capUnscrewingTorqueCardProps: AddParameterCardProps = {
    id: SealantInputParams.CAP_UNSCREWING_TORQUE,
    title: SEALANT_PARAMETER_NAMES[SealantInputParams.CAP_UNSCREWING_TORQUE],
    value: Number(data.cap_unscrewing_torque) || null,
    minValue: tresholdsData?.sealant_cap_unscrewing_torque_min || null,
    maxValue: tresholdsData?.sealant_cap_unscrewing_torque_max || null,
    unit: PARAMETER_UNITS[SealantInputParams.CAP_UNSCREWING_TORQUE],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...capMachineSpeedCardProps} />
        <AddParameterCard {...totalAirPressureCardProps} />
        <AddParameterCard {...holdersForwardCardProps} />
        <AddParameterCard {...holdersOpeningLeftCardProps} />
        <AddParameterCard {...holdersOpeningRightCardProps} />
        <AddParameterCard {...holdersClosingCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...injectionAStartCardProps} />
        <AddParameterCard {...injectionBStartCardProps} />
        <AddParameterCard {...injectionAEndCardProps} />
        <AddParameterCard {...injectionBEndCardProps} />
        <AddParameterCard {...injectionTubeOrientationStartCardProps} />
        <AddParameterCard {...injectionTubeOrientationEndCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...isCapSurfaceSmoothCardProps} />
        <AddParameterCard {...latexRingPaddingCardProps} />
        <AddParameterCard {...latexRingWidthCardProps} />
        <AddParameterCard {...tubeRigidityCardProps} />
        <AddParameterCard {...capUnscrewingTorqueCardProps} />
      </HStack>
    </VStack>
  );
}
