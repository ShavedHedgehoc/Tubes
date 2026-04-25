import { apiClient, proxyApiClient } from "@/shared/api";
import { SummaryDetailEntity } from "../model";
import { SummaryDetailDto } from "./dto";
import { SUMMARY_ENDPOINTS } from "./endpoint";

export type GetSummaryArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getSummary = async ({
  options,
  id,
}: GetSummaryArgs): Promise<SummaryDetailEntity> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<SummaryDetailDto>(
    `${SUMMARY_ENDPOINTS.DETAIL}/${id}`,
  );
  const parsedDate = new Date(res.date);

  return {
    ...res,
    date: parsedDate,
  };
};
