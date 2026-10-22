import { proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export const setActiveSummary = async ({
  id,
  crew_id,
  user_id,
  isSetup,
}: {
  id: number;
  crew_id: number;
  user_id: number;
  isSetup: number;
}) => {
  await proxyApiClient.patch(SUMMARY_ENDPOINTS.SET_ACTIVE, {
    id: id,
    crew_id: crew_id,
    user_id: user_id,
    isSetup: isSetup,
  });
};
