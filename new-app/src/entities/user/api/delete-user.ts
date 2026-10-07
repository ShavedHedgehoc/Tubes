import { proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";

export const deleteUser = async (id: number) => {
  await proxyApiClient.delete(`${USER_ENDPOINTS.DELETE}/${id}`);
};
