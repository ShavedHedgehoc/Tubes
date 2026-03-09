import { queryOptions } from "@tanstack/react-query";
import { getSummaries } from "./get-summaries";
import { SummaryParams } from "../model";
import { getSummary } from "./get-summary";
import { getAvailableSummaries } from "./get-available-summaries";

export const summaryQueries = {
  all: () => ["summaries"],
  lists: () => [...summaryQueries.all(), "list"],
  list: (params: SummaryParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...summaryQueries.lists(),
        {
          ...params,
          conveyors: Array.isArray(params.conveyors)
            ? [...params.conveyors].sort()
            : (params.conveyors ?? null),
          states: Array.isArray(params.states)
            ? [...params.states].sort()
            : (params.states ?? null),
          code: params.code ?? null,
        },
      ],
      queryFn: () =>
        getSummaries({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  available: (conveyorId: number | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...summaryQueries.all(), "available", conveyorId],
      queryFn: () => getAvailableSummaries({ conveyorId, options }),
      enabled: !!conveyorId,
      staleTime: 60 * 1000,
    }),
  details: () => [...summaryQueries.all(), "detail"],
  detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...summaryQueries.details(), id],
      queryFn: () => getSummary({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
};
