import { proxyApiClient } from "@/shared/api";
import { UpdateSummaryDto } from "./dto/update-summary.dto";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export const updateSummary = async (dto: UpdateSummaryDto) => {
  await proxyApiClient.patch(SUMMARY_ENDPOINTS.UPDATE, dto);
};
