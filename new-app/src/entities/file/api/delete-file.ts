import { proxyApiClient } from "@/shared/api";
import { FILE_ENDPOINTS } from "./endpoint";

export const deleteFile = async (id: number) => {
    await proxyApiClient.delete(`${FILE_ENDPOINTS.DELETE}/${id}`);
};
