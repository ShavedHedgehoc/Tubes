import { apiClient, proxyApiClient } from "@/shared/api";
import { ExistingIdsDto } from "./dto/existing-ids.dto";
import { PRODUCT_ENDPOINTS } from "./endpoint";

export type GetExistingPicturesIdsArgs = {
  id: string | number | null;
  options?: { isServer: boolean };
};

export const getExistingPicturesIds = async ({
  options,
  id,
}: GetExistingPicturesIdsArgs): Promise<number[]> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<ExistingIdsDto>(
    `${PRODUCT_ENDPOINTS.GET_EXISTING_PICTURES}${id}`,
  );

  return res.existingIds ?? [];
};
