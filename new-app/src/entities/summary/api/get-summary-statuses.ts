import { apiClient, proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";
import { SummaryStatusesDto } from "./dto/summary-statuses.dto";
import { SummaryDetailParams, SummaryStatusesResponse } from "../model";

export type GetSummaryArgs = SummaryDetailParams & {
  options?: { isServer: boolean };
};

export const getSummaryStatuses = async ({
  options,
  ...params
}: GetSummaryArgs): Promise<SummaryStatusesResponse> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<SummaryStatusesDto>(
    SUMMARY_ENDPOINTS.STATUSES,
    params,
  );

  const { summary, statuses } = res;

  const { conveyor, batch, product, ...rest } = summary;
  const flattenedSummary = {
    ...rest,
    date: new Date(rest.date),
    conveyorName: conveyor?.name ?? null,
    batchName: batch?.name ?? null,
    productName: product?.name ?? null,
    productCode: product?.code ?? null,
    productMarking: product?.marking ?? null,
  };

  const mappedStatuses = statuses.map((status) => {
    const { employee, operation, post, ...rest } = status;
    return {
      ...rest,
      operation_description: operation?.description ?? null,
      employee_name: employee?.name ?? null,
      post_val: post.value,
    };
  });

  return {
    ...flattenedSummary,
    statuses: mappedStatuses,
  };
};
