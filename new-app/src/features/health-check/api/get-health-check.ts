import { apiClient, proxyApiClient } from "@/shared/api";

type HealthCheck = {
  status: string;
};

export async function getHealthCheck(options?: {
  isServer: boolean;
}): Promise<HealthCheck> {
  const client = options?.isServer ? apiClient : proxyApiClient;

  const response = await client.get<HealthCheck>("health-check", {
    cache: "no-store",
  });

  return response || { status: "ok" };
}
