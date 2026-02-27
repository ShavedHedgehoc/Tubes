import { proxyApiClient } from "@/shared/api";

export const deleteEmployee = async (id: number) => {
  await proxyApiClient.delete(`/employees/${id}`);
};
