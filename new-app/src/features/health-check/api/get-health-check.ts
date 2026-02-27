import { apiClient, proxyApiClient } from "@/shared/api";

type HealthCheck = {
  status: string;
};

export async function getHealthCheck(options?: {
  isServer: boolean;
}): Promise<HealthCheck> {
  if (options?.isServer && process.env.NEXT_PHASE === 'phase-production-build') {
    return { status: "ok" };
  }
  const client = options?.isServer ? apiClient : proxyApiClient;

  const response = await client.get<HealthCheck>("health-check", {
    cache: "no-store",
  });

  return response || { status: "ok" };
}


// export async function getHealthCheck(options?: {
//   isServer: boolean;
// }): Promise<HealthCheck> {
//   // Если мы на сервере И в процессе сборки — возвращаем "ok" без реального запроса
//   if (options?.isServer && process.env.NEXT_PHASE === 'phase-production-build') {
//     return { status: "ok" };
//   }

//   const client = options?.isServer ? apiClient : proxyApiClient;

//   try {
//     const response = await client.get<HealthCheck>("health-check", {
//       cache: "no-store",
//     });
//     return response || { status: "ok" };
//   } catch (error) {
//     // Важно поймать ошибку, чтобы билд не упал
//     console.error("Health check failed during build/render", error);
//     return { status: "error" };
//   }
// }