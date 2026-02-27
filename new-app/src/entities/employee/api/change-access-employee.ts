import { proxyApiClient } from "@/shared/api";

export const changeAccessEmployee = async (id: number) => {
  await proxyApiClient.patch(`/employees/change_banned/${id}`);
};
