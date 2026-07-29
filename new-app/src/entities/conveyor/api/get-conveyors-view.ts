import { ConveyorsViewResponse } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { ConveyorsDataResponse, PostData } from "./dto/conveyors-view.response";
import { CONVEYORS_ENDPOINTS } from "./endpoints";

export type GetConveyorsViewArgs = {
  options?: { isServer: boolean };
};

export async function getConveyorsView({
  options,
}: GetConveyorsViewArgs): Promise<ConveyorsViewResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<ConveyorsDataResponse>(CONVEYORS_ENDPOINTS.VIEW);

  const mapPost = (post: PostData | null) => {
    if (!post) return null;
    return {
      postState: post.state,
      hasLock: post.hasLock,
      lockReason: post.lockReason,
      productionValue: post.production,
      employeeName: post.employee,
    };
  };
  return {
    conveyors: res.conveyors.map((item) => {
      return {
        ...item,
        summary: item.summary
          ? {
              ...item.summary,
              extrusion: mapPost(item.summary.extrusion),
              varnish: mapPost(item.summary.varnish),
              offset: mapPost(item.summary.offset),
              sealant: mapPost(item.summary.sealant),
            }
          : null,
      };
    }),
  };
}
