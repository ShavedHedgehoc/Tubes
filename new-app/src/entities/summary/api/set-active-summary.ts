import { proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export const setActiveSummary = async ({
  id,
  crew_id,
}: {
  id: number;
  crew_id: number;
}) => {
  await proxyApiClient.patch(SUMMARY_ENDPOINTS.SET_ACTIVE, {
    id: id,
    crew_id: crew_id,
  });
};
