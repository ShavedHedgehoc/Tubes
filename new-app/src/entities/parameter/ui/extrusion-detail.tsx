import { ParameterCard } from "./parameter-card";
import { ExtrusionData } from "../model";
import {
  EXTRUSION_BOOLEAN_PARAMS,
  EXTRUSION_PARAMETER_NAMES,
  EXTRUSION_TRESHOLDS_MAP,
  ExtrusionInputParams,
  PARAMETER_UNITS,
} from "@/shared/const";
import { getParamProps, ParamConfig } from "../lib";

export function ExtrusionDetail({ data }: { data: ExtrusionData | null }) {
  if (!data) return <div>Данные не найдены</div>;

  const { parameters, tresholds } = data;
  const config: ParamConfig = {
    names: EXTRUSION_PARAMETER_NAMES,
    booleanParams: EXTRUSION_BOOLEAN_PARAMS,
    thresholdsMap: EXTRUSION_TRESHOLDS_MAP,
    units: PARAMETER_UNITS,
  };

  const allParams = Object.values(ExtrusionInputParams);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
      {allParams.map((param) => {
        const props = getParamProps(param, parameters, tresholds, config);
        return <ParameterCard key={param} {...props} />;
      })}
    </div>
  );
}
