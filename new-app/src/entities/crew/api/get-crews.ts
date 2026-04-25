import { apiClient, proxyApiClient } from "@/shared/api";
import { CrewsResponse } from "../model";
import { CrewsDto } from "./dto";

type options = {
  isServer: boolean;
};

export async function getCrews({
  options,
}: {
  options?: options;
}): Promise<CrewsResponse> {
  const res = options?.isServer
    ? await apiClient.get<CrewsDto>("crews")
    : await proxyApiClient.get<CrewsDto>("crews");

  return {
    crews: res.crews,
  };
}
