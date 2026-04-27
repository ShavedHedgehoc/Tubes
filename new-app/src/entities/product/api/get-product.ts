import { ProductEntity } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { PRODUCT_ENDPOINTS } from "./endpoint";
import { ProductDto } from "./dto/product.dto";

export type GetProductArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getProduct = async ({
  options,
  id,
}: GetProductArgs): Promise<ProductEntity> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<ProductDto>(`${PRODUCT_ENDPOINTS.DETAIL}/${id}`);
  return res;
};
