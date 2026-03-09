import { proxyApiClient } from "@/shared/api";
import { CreatePostStatusData } from "../model";
import { CONVEYORS_ENDPOINTS } from "./endpoints";

const POST_ENDPOINTS: Record<number, string> = {
  1: CONVEYORS_ENDPOINTS.CREATE_EXTRUSION,
  2: CONVEYORS_ENDPOINTS.CREATE_VARNISH,
  3: CONVEYORS_ENDPOINTS.CREATE_OFFSET,
  4: CONVEYORS_ENDPOINTS.CREATE_SEALANT,
};

export const closePost = async (data: CreatePostStatusData) => {
  const { postId, ...dto } = data;
  const endpoint = POST_ENDPOINTS[postId];

  if (!endpoint) {
    throw new Error(`Неизвестный ID поста: ${postId}`);
  }

  return await proxyApiClient.post(endpoint, dto);
};
