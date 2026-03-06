import { queryOptions } from "@tanstack/react-query";
import { TresholdParams } from "../model";
import { getTresholds } from "./get-tresholds";

export const tresholdQueries = {
  all: () => ["tresholds"],
  lists: () => [...tresholdQueries.all(), "list"],
  list: (params: TresholdParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...tresholdQueries.lists(),
        {
          ...params,
          conveyors: Array.isArray(params.conveyors)
            ? [...params.conveyors].sort()
            : (params.conveyors ?? null),
          code: params.code ?? null,
          marking: params.marking ?? null,
        },
      ],
      queryFn: () =>
        getTresholds({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  details: () => [...tresholdQueries.all(), "detail"],
  detail: (
    id: string | null,
    // , options?: { isServer: boolean }
  ) =>
    queryOptions({
      queryKey: [...tresholdQueries.details(), id],
      queryFn: () => undefined,
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
};
