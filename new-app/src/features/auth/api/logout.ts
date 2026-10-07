import { getSession } from "next-auth/react";
import { proxyApiClient } from "@/shared/api";

export const logout = async () => {
  const session = await getSession();

  const token = session?.refreshToken; // Убедитесь, что accessToken проброшен в сессию
  if (token) {
    return await proxyApiClient.post("/auth/logout", { refreshToken: token });
  }

  return Promise.resolve();
};
