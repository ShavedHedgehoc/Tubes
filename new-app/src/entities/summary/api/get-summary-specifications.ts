import { apiClient, proxyApiClient } from "@/shared/api";
import { SUMMARY_ENDPOINTS } from "./endpoint";
import { SummaryDetailParams, SummarySpecificationsResponse } from "../model";
import { SummarySpecificationsDto } from "./dto/summary-specifications.dto";

export type GetSummaryArgs = SummaryDetailParams & {
  options?: { isServer: boolean };
};

export const getSummarySpecifications = async ({
  options,
  ...params
}: GetSummaryArgs): Promise<SummarySpecificationsResponse> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<SummarySpecificationsDto>(
    SUMMARY_ENDPOINTS.SPECIFICATIONS,
    params,
  );

  const { summary, specifications } = res;

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

  return {
    ...flattenedSummary,
    specifications,
  };
};
