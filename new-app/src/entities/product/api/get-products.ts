import { ProductParams, ProductResponse } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { DEFAULT_PAGE_LIMIT } from "../model/constants";
import { ProductsWithPaginationDto } from "./dto/products-with-pagination.dto";
import { PRODUCT_ENDPOINTS } from "./endpoint";

export type GetProductsArgs = ProductParams & {
  options?: { isServer: boolean };
};

export async function getProducts({
  options,
  ...params
}: GetProductsArgs): Promise<ProductResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<ProductsWithPaginationDto>(
    PRODUCT_ENDPOINTS.LIST,
    params,
  );
  const mappedProducts = res.rows.map((product) => {
    const { product_pictures, ...rest } = product;
    const pics = (product_pictures || []).map((p) => {
      return {
        picture_record_id: p.id,
        picture_order: p.order,
        picture_file: { ...p.file_path, filename: p.file_path.name },
      };
    });
    return { ...rest, product_pictures: pics };
  });
  return {
    products: mappedProducts ?? [],
    total: res.total,
    totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
  };
}
