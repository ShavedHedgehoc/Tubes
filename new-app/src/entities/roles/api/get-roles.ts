import { apiClient, proxyApiClient } from "@/shared/api";
import { RolesResponce } from "../model";
import { RolesDto } from "./dto";

type options = {
  isServer: boolean;
};

export async function getRoles({
  options,
}: {
  options?: options;
}): Promise<RolesResponce> {
  const res = options?.isServer
    ? await apiClient.get<RolesDto>("roles")
    : await proxyApiClient.get<RolesDto>("roles");
  return {
    roles: res.roles,
  };
}
