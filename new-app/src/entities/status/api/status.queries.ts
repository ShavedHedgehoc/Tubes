import { queryOptions } from "@tanstack/react-query";
import { getPostStatuses } from "./get-post-statuses";
import { StatusParams } from "../model";
import { getStatusesList } from "./get-statuses-list";

export const statusQueries = {
  all: () => ["statuses"],
  lists: () => [...statusQueries.all(), "list"],
  list: (params: StatusParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...statusQueries.lists(),
        {
          ...params,
          posts: Array.isArray(params.posts)
            ? [...params.posts].sort()
            : (params.posts ?? null),
          // states: Array.isArray(params.states)
          //   ? [...params.states].sort()
          //   : (params.states ?? null),
          // code: params.code ?? null,
        },
      ],
      queryFn: () =>
        getStatusesList({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  post_lists: () => [...statusQueries.all(), "post_list"],
  post_list: (
    {
      summary_id,
      post_val,
    }: { summary_id: number | null; post_val: number | null },
    options?: { isServer: boolean },
  ) =>
    queryOptions({
      queryKey: [
        ...statusQueries.post_lists(),
        {
          summary_id,
          post_val,
        },
      ],
      queryFn: () =>
        getPostStatuses({
          summary_id: summary_id,
          post_val: post_val,
          options,
        }),
      enabled: Boolean(summary_id && post_val),
      staleTime: 10 * 1000,
    }),
};
