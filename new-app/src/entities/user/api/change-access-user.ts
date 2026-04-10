import { proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";

export const changeAccessUser = async (id: number) => {
    await proxyApiClient.patch(`${USER_ENDPOINTS.CHANGE_BANNED}/${id}`);
};
