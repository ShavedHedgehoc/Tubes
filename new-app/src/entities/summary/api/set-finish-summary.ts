import { proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export const setFinishSummary = async (id: number) => {
  await proxyApiClient.patch(SUMMARY_ENDPOINTS.SET_FINISH, { id: id });
};
