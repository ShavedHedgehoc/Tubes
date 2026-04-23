import { apiClient, proxyApiClient } from "@/shared/api";
import { STATUS_ENDPOINTS } from "./endpoints";
import { StatusResponseDto } from "./dto/status-response.dto";
import { StatusResponse } from "../model/types";

export type GetStatusesArgs = {
  summary_id: number | null;
  post_val: number | null;
  options?: { isServer: boolean };
};

export async function getPostStatuses({
  options,
  ...params
}: GetStatusesArgs): Promise<StatusResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<StatusResponseDto>(
    STATUS_ENDPOINTS.POST_STATUSES,
    params,
  );

  const mappedStatuses = res.statuses.map((status) => {
    const { employee, operation, maintenance_session, post, ...rest } = status;
    return {
      ...rest,

      operation_description: operation?.description ?? null,
      maintenance_description:
        maintenance_session?.maintenance?.description ?? null,
      employee_name: employee?.name ?? null,
      post_val: post.value,
    };
  });
  return {
    statuses: mappedStatuses,
  };
}
