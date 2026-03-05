import { proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";
import { SummaryUploadDto } from "./dto";

export const uploadData = async (dto: SummaryUploadDto) => {
  await proxyApiClient.post(SUMMARY_ENDPOINTS.UPLOAD, dto);
};
