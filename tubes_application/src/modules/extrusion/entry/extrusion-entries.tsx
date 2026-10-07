import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { EXTRUSION_PARAMETER_NAMES } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";
import {
  useExtrusionInputStore,
  ExtrusionInputParams,
} from "../store/use-extrusion-input-store";
import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { PARAMETER_UNITS } from "@/shared/helpers/parameter-units";
import useExtrusionEntriesHandleCardsClick from "./use-extrusion-entries-handle-cards-click";
import { parseValue } from "@/shared/helpers/parse-value";

export default function ExtrusionEntries({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  const data = useExtrusionInputStore(useShallow((state) => state.data));

  const { handleCardClick, handleBooleanCardClick, handleIntegerCardClick } =
    useExtrusionEntriesHandleCardsClick();

  const tresholdsData = summaryData?.tresholds;
  const lastCounterValue = summaryData?.extrusionParams
    ? summaryData.extrusionParams.counter_value
    : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.COUNTER_VALUE,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.COUNTER_VALUE],
    value: parseValue(data.counter_value),
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: PARAMETER_UNITS[ExtrusionInputParams.COUNTER_VALUE],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const pressSpeedCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.PRESS_SPEED,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.PRESS_SPEED],
    value: parseValue(data.press_speed),
    minValue: tresholdsData?.extrusion_press_speed_min ?? 0,
    maxValue: tresholdsData?.extrusion_press_speed_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.PRESS_SPEED],

    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const blowTimeCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.BLOW_TIME,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.BLOW_TIME],
    value: parseValue(data.blow_time),
    minValue: tresholdsData?.extrusion_blow_time_min ?? 0,
    maxValue: tresholdsData?.extrusion_blow_time_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.BLOW_TIME],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const turningMachineSpeedCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TURNING_MACHINE_SPEED,
    title:
      EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TURNING_MACHINE_SPEED],
    value: parseValue(data.turning_machine_speed),
    minValue: tresholdsData?.extrusion_turning_machine_speed_min ?? 0,
    maxValue: tresholdsData?.extrusion_turning_machine_speed_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TURNING_MACHINE_SPEED],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const annealingFurnaceTempCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.ANNEALING_FURNACE_TEMP,
    title:
      EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.ANNEALING_FURNACE_TEMP],
    value: parseValue(data.annealing_furnace_temp),
    minValue: tresholdsData?.extrusion_annealing_furnace_temp_min ?? 0,
    maxValue: tresholdsData?.extrusion_annealing_furnace_temp_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.ANNEALING_FURNACE_TEMP],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const tubeCylindricalSectionLengthCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH,
    title:
      EXTRUSION_PARAMETER_NAMES[
        ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH
      ],
    value: parseValue(data.tube_cylindrical_section_length),
    minValue: tresholdsData?.extrusion_tube_cylindrical_section_length_min ?? 0,
    maxValue: tresholdsData?.extrusion_tube_cylindrical_section_length_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const membraneThicknessCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.MEMBRANE_THICKNESS,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.MEMBRANE_THICKNESS],
    value: parseValue(data.membrane_thickness),
    minValue: tresholdsData?.extrusion_membrane_thickness_min ?? 0,
    maxValue: tresholdsData?.extrusion_membrane_thickness_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.MEMBRANE_THICKNESS],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeDiameterCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_DIAMETER,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_DIAMETER],
    value: parseValue(data.tube_diameter),
    minValue: tresholdsData?.extrusion_tube_diameter_min ?? 0,
    maxValue: tresholdsData?.extrusion_tube_diameter_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_DIAMETER],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeCylindricalThicknessCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_CYLINDRICAL_THICKNESS,
    title:
      EXTRUSION_PARAMETER_NAMES[
        ExtrusionInputParams.TUBE_CYLINDRICAL_THICKNESS
      ],
    value: parseValue(data.tube_cylindrical_thickness),
    minValue:
      tresholdsData?.extrusion_tube_cylindrical_section_thickness_min ?? 0,
    maxValue:
      tresholdsData?.extrusion_tube_cylindrical_section_thickness_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_CYLINDRICAL_THICKNESS],
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeRigidityCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_RIGIDITY,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_RIGIDITY],
    value: parseValue(data.tube_rigidity),
    minValue: tresholdsData?.extrusion_tube_rigidity_min ?? 0,
    maxValue: tresholdsData?.extrusion_tube_rigidity_max ?? 0,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_RIGIDITY],
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const tubeCuttingQualityCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_CUTTING_QUALITY,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_CUTTING_QUALITY],
    booleanValue: data.tube_cutting_quality ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const tightnessCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TIGHTNESS,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TIGHTNESS],
    booleanValue: data.tightness ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const externalThreadqualityCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.EXTERNAL_THREAD_QUALITY,
    title:
      EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.EXTERNAL_THREAD_QUALITY],
    booleanValue: data.external_thread_quality ?? null,
    stringDefaultValue: tresholdsData?.extrusion_external_thread_value ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const tubeMarkingCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_MARKING,
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_MARKING],
    booleanValue: data.tube_marking ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...pressSpeedCardProps} />
        <AddParameterCard {...blowTimeCardProps} />
        <AddParameterCard {...turningMachineSpeedCardProps} />
        <AddParameterCard {...annealingFurnaceTempCardProps} />
      </HStack>
      <HStack h="full" w="full">
        <AddParameterCard {...tubeCylindricalSectionLengthCardProps} />
        <AddParameterCard {...membraneThicknessCardProps} />
        <AddParameterCard {...tubeDiameterCardProps} />
        <AddParameterCard {...tubeCylindricalThicknessCardProps} />
        <AddParameterCard {...tubeRigidityCardProps} />
      </HStack>
      <HStack h="full" w="full">
        <AddParameterCard {...tubeCuttingQualityCardProps} />
        <AddParameterCard {...tightnessCardProps} />
        <AddParameterCard {...tubeMarkingCardProps} />
        <AddParameterCard {...externalThreadqualityCardProps} />
      </HStack>
    </VStack>
  );
}
