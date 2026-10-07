import { proxyApiClient } from "@/shared/api";
import { CreatePostStatusData } from "../model";
import { CONVEYORS_ENDPOINTS } from "./endpoints";

export const closePost = async (dto: CreatePostStatusData) => {
  return await proxyApiClient.post(CONVEYORS_ENDPOINTS.CREATE_STATUS, dto);
};
