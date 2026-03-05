import { proxyApiClient } from "@/shared/api";
import { TresholdsUploadDto } from "./dto/tresholds-upload.dto";
import { TRESHOLDS_ENDPOINTS } from "./endpoint";

export const uploadData = async (dto: TresholdsUploadDto) => {
    await proxyApiClient.post(TRESHOLDS_ENDPOINTS.UPLOAD, dto);
};
