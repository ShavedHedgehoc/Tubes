import { apiClient, proxyApiClient } from "@/shared/api";
import {
  DEFAULT_PAGE_LIMIT,
  OperationParams,
  OperationResponse,
  OperationRow,
} from "../model";

import { OPERATION_ENDPOINTS } from "./endpoint";
import { OperationsWithPaginationDto } from "./dto/opertions-with-pagination.dto";

export type GetOperationsArgs = OperationParams & {
  options?: { isServer: boolean };
};

export async function getOperations({
  options,
  ...params
}: GetOperationsArgs): Promise<OperationResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<OperationsWithPaginationDto>(
    OPERATION_ENDPOINTS.LIST,
    params,
  );
  const mappedOperations: OperationRow[] = res.rows.map((operation) => {
    const { operation_pictures, post, min_rank, ...rest } = operation;
    const pics = (operation_pictures || []).map((p) => {
      return {
        picture_record_id: p.id,
        picture_order: p.order,
        picture_file: { ...p.file_path, filename: p.file_path.name },
      };
    });
    return {
      ...rest,
      operation_pictures: pics,
      post_name: post.name,
      min_rank_description: min_rank.description,
    };
  });
  return {
    operations: mappedOperations ?? [],
    total: res.total,
    totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
  };
}
