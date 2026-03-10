import { apiClient, proxyApiClient } from "@/shared/api";
import { SummuryAvailableResponse } from "../model";
import { AvailableSummariesDto } from "./dto";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export type GetAvailableSummariesArgs = {
  conveyorId: number | null;
  options?: { isServer: boolean };
};

export const getAvailableSummaries = async ({
  options,
  conveyorId,
}: GetAvailableSummariesArgs): Promise<SummuryAvailableResponse> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<AvailableSummariesDto>(
    `${SUMMARY_ENDPOINTS.AVAILABLE}${conveyorId}`,
  );
  return res;
};
