import { apiClient, proxyApiClient } from "@/shared/api";
import { ConveyorsResponse } from "../model";
import { ConveyorsDto } from "./dto";
import { CONVEYORS_ENDPOINTS } from "./endpoints";

type options = {
  isServer: boolean;
};

export async function getConveyors({
  options,
}: {
  options?: options;
}): Promise<ConveyorsResponse> {
  const res = options?.isServer
    ? await apiClient.get<ConveyorsDto>(CONVEYORS_ENDPOINTS.LIST)
    : await proxyApiClient.get<ConveyorsDto>(CONVEYORS_ENDPOINTS.LIST);

  return {
    conveyors: res.conveyors,
  };
}
