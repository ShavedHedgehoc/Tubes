import { proxyApiClient } from "@/shared/api";
import { FILE_ENDPOINTS } from "./endpoint";

export const uploadFile = async (formData: FormData) => {
    await proxyApiClient.post(FILE_ENDPOINTS.UPLOAD, formData)
}
