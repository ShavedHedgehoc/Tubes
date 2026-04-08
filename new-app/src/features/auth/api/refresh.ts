import { apiClient } from "@/shared/api";

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const refresh = async (
  refreshToken: string,
): Promise<RefreshResponse> => {
  const response = await apiClient.post<RefreshResponse>(`auth/refresh`, {
    refreshToken,
  });
  return response;
};
