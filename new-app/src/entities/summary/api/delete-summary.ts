import { proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export const deleteSummary = async (id: number) => {
  await proxyApiClient.delete(`${SUMMARY_ENDPOINTS.DELETE}/${id}`);
};
