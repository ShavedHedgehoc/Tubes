import {
  ExtrusionDataRaw,
  OffsetDataRaw,
  SealantDataRaw,
  Treshold,
  VarnishDataRaw,
} from "../model";
import { ParameterCardProps } from "../ui/parameter-card";

export interface ParamConfig {
  names: Record<string, string>;
  booleanParams: readonly string[];
  thresholdsMap: Record<
    string,
    { min?: string; max?: string; default?: string }
  >;
  units: Record<string, string>;
}

type UniData =
  | ExtrusionDataRaw
  | VarnishDataRaw
  | OffsetDataRaw
  | SealantDataRaw;

export const getParamProps = (
  paramKey: string,
  data: UniData,
  thresholds: Treshold,
  config: ParamConfig,
): ParameterCardProps => {
  const isBoolean = config.booleanParams.includes(paramKey);
  const paramThresholds = config.thresholdsMap[paramKey];
  const dataKey = paramKey as keyof UniData;

  const baseProps = {
    title: config.names[paramKey] || paramKey,
    // key: paramKey,
  };
  const stringDefaultValue = paramThresholds?.default
    ? (thresholds?.[paramThresholds.default as keyof Treshold] as string)
    : null;

  if (isBoolean) {
    const rawValue = data[dataKey];
    return {
      ...baseProps,
      variant: "boolean",
      stringDefaultValue,
      booleanValue: !!rawValue,
    };
  }
  const minValue = paramThresholds?.min
    ? thresholds?.[paramThresholds.min as keyof Treshold]
    : null;
  const maxValue = paramThresholds?.max
    ? thresholds?.[paramThresholds.max as keyof Treshold]
    : null;

  return {
    ...baseProps,
    variant: "numeric",
    value: typeof data[dataKey] === "number" ? data[dataKey] : null,
    minValue: typeof minValue === "number" ? minValue : null,
    maxValue: typeof maxValue === "number" ? maxValue : null,
    unit: config.units[paramKey] ?? "",
    stringDefaultValue,
  };
};
