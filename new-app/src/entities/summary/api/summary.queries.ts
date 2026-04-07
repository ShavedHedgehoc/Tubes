import { queryOptions } from "@tanstack/react-query";
import { getSummaries } from "./get-summaries";
import { SummaryDetailParams, SummaryParams } from "../model";
import { getSummary } from "./get-summary";
import { getAvailableSummaries } from "./get-available-summaries";
import { getSummaryStatuses } from "./get-summary-statuses";
import { getSummaryReport } from "./get-summary-report";

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
  availables: () => [...summaryQueries.all(), "available"],
  available: (conveyorId: number | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...summaryQueries.availables(), conveyorId],
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
  statuses: () => [...summaryQueries.all(), "statuses"],
  status: (params: SummaryDetailParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...summaryQueries.statuses(), { ...params }],
      queryFn: () => getSummaryStatuses({ ...params, options }),
      staleTime: 30 * 1000,
    }),
  reports: () => [...summaryQueries.all(), "reports"],
  report: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...summaryQueries.reports(), id],
      queryFn: () => getSummaryReport({ id, options }),
      enabled: !!id,
      staleTime: 30 * 1000,
    }),
};
