import { apiClient, proxyApiClient } from "@/shared/api";
import {
  AnyParameter,
  OffsetData,
  OffsetDataRaw,
  ParameterSummaryData,
  Treshold,
} from "../model";
import { PARAM_ENDPOINTS } from "./endpoints";
import { OffsetParamResponse } from "./dto/offset-param-response.dto";

export type GetParamArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getOffsetParam = async ({
  options,
  id,
}: GetParamArgs): Promise<AnyParameter> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<OffsetParamResponse>(
    `${PARAM_ENDPOINTS.OFFSET_PARAMS_DETAIL}/${id}`,
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
  const mappedParamaters: OffsetDataRaw = {
    ...parameters,
    createdAt: parsedParameterDate,
  };

  const parsedTresholdsDate = new Date(tresholds.createdAt);
  const mappedTresholds: Treshold = {
    ...tresholds,
    createdAt: parsedTresholdsDate,
  };

  const data: OffsetData = {
    ...rest,
    summary: mappedSummary,
    parameters: mappedParamaters,
    tresholds: mappedTresholds,
  };
  return {
    type: "offset",
    data: data,
  };
};
