import { queryOptions } from "@tanstack/react-query";
import { getOperations } from "./get-operations";
import { OperationParams } from "../model";
import { getExistingPicturesIds } from "./get-existing-pictures-ids";

export const operationQueries = {
  all: () => ["operations"],
  lists: () => [...operationQueries.all(), "list"],
  list: (params: OperationParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...operationQueries.lists(),
        {
          ...params,
          posts: Array.isArray(params.posts)
            ? [...params.posts].sort()
            : (params.posts ?? null),
          min_ranks: Array.isArray(params.min_ranks)
            ? [...params.min_ranks].sort()
            : (params.min_ranks ?? null),
          value: params.value ?? null,
          description: params.description ?? null,
        },
      ],
      queryFn: () =>
        getOperations({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  picture_ids: () => [...operationQueries.all(), "picture_ids"],
  picture_id_array: (
    id: string | number | null,
    options?: { isServer: boolean },
  ) =>
    queryOptions({
      queryKey: [...operationQueries.picture_ids(), id],
      queryFn: () => getExistingPicturesIds({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
};
