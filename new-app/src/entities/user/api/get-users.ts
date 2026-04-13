import { apiClient, proxyApiClient } from "@/shared/api";

import { USER_ENDPOINTS } from "./endpoint";
import { UsersWithPaginationDto } from "./dto/users-with-pagination.dto";
import { DEFAULT_PAGE_LIMIT, UserParams, UserResponse } from "../model";

export type GetUsersArgs = UserParams & {
  options?: { isServer: boolean };
};

export async function getUsers({
  options,
  ...params
}: GetUsersArgs): Promise<UserResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;

  const res = await client.get<UsersWithPaginationDto>(
    USER_ENDPOINTS.LIST,
    params,
  );

  return {
    ...res,
    totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
  };
}
