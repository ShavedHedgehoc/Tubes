import { proxyApiClient } from "@/shared/api";
import { OPERATION_ENDPOINTS } from "./endpoint";

export const changeOperationActivity = async (id: number) => {
  await proxyApiClient.patch(`${OPERATION_ENDPOINTS.CHANGE_BANNED}/${id}`);
};
