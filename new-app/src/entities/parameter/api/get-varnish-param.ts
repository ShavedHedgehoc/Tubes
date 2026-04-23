import { apiClient, proxyApiClient } from "@/shared/api";
import {
  AnyParameter,
  VarnishData,
  VarnishDataRaw,
  ParameterSummaryData,
  Treshold,
} from "../model";
import { PARAM_ENDPOINTS } from "./endpoints";
import { VarnishParamResponse } from "./dto/varnish-param-response.dto";

export type GetParamArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getVarnishParam = async ({
  options,
  id,
}: GetParamArgs): Promise<AnyParameter> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<VarnishParamResponse>(
    `${PARAM_ENDPOINTS.VARNISH_PARAMS_DETAIL}/${id}`,
  );
  const { summary, parameters, tresholds, ...rest } = res;

  const parsedSummaryDate = new Date(summary.date);
  const mappedSummary: ParameterSummaryData = {
    ...summary,
    productCode: summary.product.code,
    productName: summary.product.name,
    batchName: summary.batch.name,
    date: parsedSummaryDate,
  };

  const parsedParameterDate = new Date(parameters.createdAt);
  const mappedParamaters: VarnishDataRaw = {
    ...parameters,
    createdAt: parsedParameterDate,
  };

  const parsedTresholdsDate = new Date(tresholds.createdAt);
  const mappedTresholds: Treshold = {
    ...tresholds,
    createdAt: parsedTresholdsDate,
  };

  const data: VarnishData = {
    ...rest,
    summary: mappedSummary,
    parameters: mappedParamaters,
    tresholds: mappedTresholds,
  };
  return {
    type: "varnish",
    data: data,
  };
};
