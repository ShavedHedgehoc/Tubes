import { ParameterCard } from "./parameter-card";
import { SealantData } from "../model";
import {
  SEALANT_BOOLEAN_PARAMS,
  SEALANT_PARAMETER_NAMES,
  SEALANT_TRESHOLDS_MAP,
  SealantInputParams,
  PARAMETER_UNITS,
} from "@/shared/const";
import { getParamProps, ParamConfig } from "../lib";

export function SealantDetail({ data }: { data: SealantData | null }) {
  if (!data) return <div>Данные не найдены</div>;

  const { parameters, tresholds } = data;
  const config: ParamConfig = {
    names: SEALANT_PARAMETER_NAMES,
    booleanParams: SEALANT_BOOLEAN_PARAMS,
    thresholdsMap: SEALANT_TRESHOLDS_MAP,
    units: PARAMETER_UNITS,
  };

  const allParams = Object.values(SealantInputParams);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
      {allParams.map((param) => {
        const props = getParamProps(param, parameters, tresholds, config);
        return <ParameterCard key={param} {...props} />;
      })}
    </div>
  );
}
