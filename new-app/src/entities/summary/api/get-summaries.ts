import { apiClient, proxyApiClient } from "@/shared/api";

import { SUMMARY_ENDPOINTS } from "./endpoint";
import { SummariesWithPaginationDto } from "./dto";
import { DEFAULT_PAGE_LIMIT, SummaryParams, SummaryResponse } from "../model";

export type GetSummariesArgs = SummaryParams & {
  options?: { isServer: boolean };
};

export async function getSummaries({
  options,
  ...params
}: GetSummariesArgs): Promise<SummaryResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;

  const res = await client.get<SummariesWithPaginationDto>(
    SUMMARY_ENDPOINTS.LIST,
    params,
  );

  return {
    summaries: res.rows
      ? res.rows.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      : [],
    total: res.total,
    totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
  };
}

// SummaryResponse - тип для фронтенда
// SummariesWithPaginationDto - то, что отдает сервер
