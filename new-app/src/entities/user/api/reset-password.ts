import { proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";

export const resetPassword = async (id: number) => {
    await proxyApiClient.patch(`${USER_ENDPOINTS.RESET}/${id}`);
};
