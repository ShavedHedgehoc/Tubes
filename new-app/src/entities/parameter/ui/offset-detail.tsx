import { ParameterCard } from "./parameter-card";
import { OffsetData } from "../model";
import {
  OFFSET_BOOLEAN_PARAMS,
  OFFSET_PARAMETER_NAMES,
  OFFSET_TRESHOLDS_MAP,
  OffsetInputParams,
  PARAMETER_UNITS,
} from "@/shared/const";
import { getParamProps, ParamConfig } from "../lib";

export function OffsetDetail({ data }: { data: OffsetData | null }) {
  if (!data) return <div>Данные не найдены</div>;

  const { parameters, tresholds } = data;
  const config: ParamConfig = {
    names: OFFSET_PARAMETER_NAMES,
    booleanParams: OFFSET_BOOLEAN_PARAMS,
    thresholdsMap: OFFSET_TRESHOLDS_MAP,
    units: PARAMETER_UNITS,
  };

  const allParams = Object.values(OffsetInputParams);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
      {allParams.map((param) => {
        const props = getParamProps(param, parameters, tresholds, config);
        return <ParameterCard key={param} {...props} />;
      })}
    </div>
  );
}
