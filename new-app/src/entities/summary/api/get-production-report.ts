import { apiClient, proxyApiClient } from "@/shared/api";

import { SUMMARY_ENDPOINTS } from "./endpoint";
import { SummaryParams, SummaryProductionReportResponse } from "../model";
import { SummariesProductionReportDto } from "./dto/summary-production-report.dto";

export type GetProductionReportArgs = SummaryParams & {
  options?: { isServer: boolean };
};

export async function getProductionReport({
  options,
  ...params
}: GetProductionReportArgs): Promise<SummaryProductionReportResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;

  const res = await client.get<SummariesProductionReportDto>(
    SUMMARY_ENDPOINTS.PRODUCTION_REPORT,
    params,
  );

  return {
    startDate: res.startDate,
    endDate: res.endDate,
    summaries: res.rows
      ? res.rows.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      : [],
  };
}

// SummaryResponse - тип для фронтенда
// SummariesWithPaginationDto - то, что отдает сервер
