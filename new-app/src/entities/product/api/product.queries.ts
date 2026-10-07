import { queryOptions } from "@tanstack/react-query";
import { ProductParams } from "../model";
import { getProducts } from "./get-products";
import { getExistingPicturesIds } from "./get-existing-pictures-ids";
import { getProduct } from "./get-product";

export const productQueries = {
  all: () => ["products"],
  lists: () => [...productQueries.all(), "list"],
  list: (params: ProductParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...productQueries.lists(),
        {
          ...params,
          code: params.code ?? null,
          name: params.name ?? null,
          marking: params.marking ?? null,
        },
      ],
      queryFn: () =>
        getProducts({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  details: () => [...productQueries.all(), "detail"],
  detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...productQueries.details(), id],
      queryFn: () => getProduct({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
  picture_ids: () => [...productQueries.all(), "picture_ids"],
  picture_id_array: (
    id: string | number | null,
    options?: { isServer: boolean },
  ) =>
    queryOptions({
      queryKey: [...productQueries.picture_ids(), id],
      queryFn: () => getExistingPicturesIds({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
};
