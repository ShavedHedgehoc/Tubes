import { ParameterCard } from "./parameter-card";
import { VarnishData } from "../model";
import {
  VARNISH_BOOLEAN_PARAMS,
  VARNISH_PARAMETER_NAMES,
  VARNISH_TRESHOLDS_MAP,
  VarnishInputParams,
  PARAMETER_UNITS,
} from "@/shared/const";
import { getParamProps, ParamConfig } from "../lib";

export function VarnishDetail({ data }: { data: VarnishData | null }) {
  if (!data) return <div>Данные не найдены</div>;

  const { parameters, tresholds } = data;
  const config: ParamConfig = {
    names: VARNISH_PARAMETER_NAMES,
    booleanParams: VARNISH_BOOLEAN_PARAMS,
    thresholdsMap: VARNISH_TRESHOLDS_MAP,
    units: PARAMETER_UNITS,
  };

  const allParams = Object.values(VarnishInputParams);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 w-full">
      {allParams.map((param) => {
        const props = getParamProps(param, parameters, tresholds, config);
        return <ParameterCard key={param} {...props} />;
      })}
    </div>
  );
}
