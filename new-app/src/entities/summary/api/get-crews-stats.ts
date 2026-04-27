import { apiClient, proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";
import { ChartDataResponse, SummaryCrewsStatsParams } from "../model";
import { CrewStatsDto } from "./dto/crew-stats.dto";

export type GetCrewStatsArgs = SummaryCrewsStatsParams & {
  options?: { isServer: boolean };
};

export async function getCrewsStats({
  options,
  ...params
}: GetCrewStatsArgs): Promise<ChartDataResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;

  const res = await client.get<CrewStatsDto>(
    SUMMARY_ENDPOINTS.CREWS_STATS,
    params,
  );

  return res;
}
