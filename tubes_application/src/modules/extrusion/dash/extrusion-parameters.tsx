import type { ISummary } from "@/shared/api/services/summary-service";
import { VStack, HStack } from "@chakra-ui/react";
import ParameterCard, {
  type ParameterCardProps,
} from "../../../shared/components/cards/parameter-card";
import { EXTRUSION_PARAMETER_NAMES } from "@/shared/helpers/parameter-names";
import { PARAMETER_UNITS } from "@/shared/helpers/parameter-units";
import NotFound from "@/shared/components/info/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import { ExtrusionInputParams } from "../store/use-extrusion-input-store";

export default function ExtrusionParameters({
  summaryData,
}: {
  summaryData: ISummary | null;
}) {
  const paramsData = summaryData?.extrusionParams ?? null;
  const tresholdsData = summaryData?.tresholds ?? null;

  const pressSpeedCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.PRESS_SPEED],
    value: paramsData?.press_speed ?? null,
    minValue: tresholdsData?.extrusion_press_speed_min ?? null,
    maxValue: tresholdsData?.extrusion_press_speed_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.PRESS_SPEED],
    variant: "numeric",
  };
  const blowTimeCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.BLOW_TIME],
    value: paramsData?.blow_time ?? null,
    minValue: tresholdsData?.extrusion_blow_time_min ?? null,
    maxValue: tresholdsData?.extrusion_blow_time_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.BLOW_TIME],
    variant: "numeric",
  };
  const turningMachineSpeedCardProps: ParameterCardProps = {
    title:
      EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TURNING_MACHINE_SPEED],
    value: paramsData?.turning_machine_speed ?? null,
    minValue: tresholdsData?.extrusion_turning_machine_speed_min ?? null,
    maxValue: tresholdsData?.extrusion_turning_machine_speed_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TURNING_MACHINE_SPEED],
    variant: "numeric",
  };
  const annealingFurnaceTempCardProps: ParameterCardProps = {
    title:
      EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.ANNEALING_FURNACE_TEMP],
    value: paramsData?.annealing_furnace_temp ?? null,
    minValue: tresholdsData?.extrusion_annealing_furnace_temp_min ?? null,
    maxValue: tresholdsData?.extrusion_annealing_furnace_temp_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.ANNEALING_FURNACE_TEMP],
    variant: "numeric",
  };
  const tubeCylindricalSectionLengthCardProps: ParameterCardProps = {
    title:
      EXTRUSION_PARAMETER_NAMES[
        ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH
      ],
    value: paramsData?.tube_cylindrical_section_length ?? null,
    minValue:
      tresholdsData?.extrusion_tube_cylindrical_section_length_min ?? null,
    maxValue:
      tresholdsData?.extrusion_tube_cylindrical_section_length_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_CYLINDRICAL_SECTION_LENGTH],
    variant: "numeric",
  };
  const membraneThicknessCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.MEMBRANE_THICKNESS],
    value: paramsData?.membrane_thickness ?? null,
    minValue: tresholdsData?.extrusion_membrane_thickness_min ?? null,
    maxValue: tresholdsData?.extrusion_membrane_thickness_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.MEMBRANE_THICKNESS],
    variant: "numeric",
  };
  const tubeDiameterCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_DIAMETER],
    value: paramsData?.tube_diameter ?? null,
    minValue: tresholdsData?.extrusion_tube_diameter_min ?? null,
    maxValue: tresholdsData?.extrusion_tube_diameter_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_DIAMETER],
    variant: "numeric",
  };
  const tubeCylindricalThicknessCardProps: ParameterCardProps = {
    title:
      EXTRUSION_PARAMETER_NAMES[
        ExtrusionInputParams.TUBE_CYLINDRICAL_THICKNESS
      ],
    value: paramsData?.tube_cylindrical_section_thickness ?? null,
    minValue:
      tresholdsData?.extrusion_tube_cylindrical_section_thickness_min ?? null,
    maxValue:
      tresholdsData?.extrusion_tube_cylindrical_section_thickness_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_CYLINDRICAL_THICKNESS],
    variant: "numeric",
  };
  const tubeRigidityCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_RIGIDITY],
    value: paramsData?.tube_rigidity ?? null,
    minValue: tresholdsData?.extrusion_tube_rigidity_min ?? null,
    maxValue: tresholdsData?.extrusion_tube_rigidity_max ?? null,
    unit: PARAMETER_UNITS[ExtrusionInputParams.TUBE_RIGIDITY],
    variant: "numeric",
  };

  const tubeCuttingQualityCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_CUTTING_QUALITY],
    booleanValue: paramsData?.tube_cutting_quality ?? null,
    variant: "boolean",
  };
  const tightnessCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TIGHTNESS],
    booleanValue: paramsData?.tightness ?? null,
    variant: "boolean",
  };

  const tubeMarkingCardProps: ParameterCardProps = {
    title: EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.TUBE_MARKING],
    booleanValue: paramsData?.tube_marking ?? null,
    variant: "boolean",
  };

  const externalThreadqualityCardProps: ParameterCardProps = {
    title:
      EXTRUSION_PARAMETER_NAMES[ExtrusionInputParams.EXTERNAL_THREAD_QUALITY],
    booleanValue: paramsData?.external_thread_quality ?? null,
    stringDefaultValue: tresholdsData?.extrusion_external_thread_value ?? null,
    variant: "boolean",
  };

  if (!tresholdsData)
    return <NotFound message={AppMessages.PARAMS_NOT_FOUND} />;

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...pressSpeedCardProps} />
        <ParameterCard {...blowTimeCardProps} />
        <ParameterCard {...turningMachineSpeedCardProps} />
        <ParameterCard {...annealingFurnaceTempCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...tubeCylindricalSectionLengthCardProps} />
        <ParameterCard {...membraneThicknessCardProps} />
        <ParameterCard {...tubeDiameterCardProps} />
        <ParameterCard {...tubeCylindricalThicknessCardProps} />
        <ParameterCard {...tubeRigidityCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...tubeCuttingQualityCardProps} />
        <ParameterCard {...tightnessCardProps} />
        <ParameterCard {...tubeMarkingCardProps} />
        <ParameterCard {...externalThreadqualityCardProps} />
      </HStack>
    </VStack>
  );
}
