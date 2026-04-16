import { proxyApiClient } from "@/shared/api";
import { EMPLOYEE_ENDPOINTS } from "./endpoint";

export const changeAccessEmployee = async (id: number) => {
  await proxyApiClient.patch(`${EMPLOYEE_ENDPOINTS.CHANGE_BANNED}/${id}`);
};
