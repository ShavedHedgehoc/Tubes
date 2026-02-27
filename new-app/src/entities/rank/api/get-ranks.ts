import { apiClient, proxyApiClient } from "@/shared/api";
import { RanksResponce } from "../model";
import { RanksDto } from "./dto";

type options = {
  isServer: boolean;
};

export async function getRanks({
  options,
}: {
  options?: options;
}): Promise<RanksResponce> {
  const res = options?.isServer
    ? await apiClient.get<RanksDto>("ranks")
    : await proxyApiClient.get<RanksDto>("ranks");

  return {
    ranks: res.ranks,
  };
}
