import { proxyApiClient } from "@/shared/api";
import { SummaryUploadDto } from "../model";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export const uploadData = async (dto: SummaryUploadDto) => {
  await proxyApiClient.post(SUMMARY_ENDPOINTS.UPLOAD, dto);
};
