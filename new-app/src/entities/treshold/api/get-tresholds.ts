import { TresholdParams, TresholdResponse } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { TresholdsWithPaginationDto } from "./dto";
import { TRESHOLDS_ENDPOINTS } from "./endpoint";

export type GetTresholdsArgs = TresholdParams & {
  options?: { isServer: boolean };
};

export async function getTresholds({
  options,
  ...params
}: GetTresholdsArgs): Promise<TresholdResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<TresholdsWithPaginationDto>(
    TRESHOLDS_ENDPOINTS.LIST,
    params,
  );
  return {
    tresholds: res.rows
      ? res.rows.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }))
      : [],
    total: res.total,
    totalPages: Math.ceil(res.total / (params.limit || 10)),
  };
}
