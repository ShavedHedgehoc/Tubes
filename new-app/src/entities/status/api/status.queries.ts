import { queryOptions } from "@tanstack/react-query";
import { getStatuses } from "./get-statuses";

export const statusQueries = {
  all: () => ["statuses"],
  lists: () => [...statusQueries.all(), "list"],
  list: (
    {
      summary_id,
      post_val,
    }: { summary_id: number | null; post_val: number | null },
    options?: { isServer: boolean },
  ) =>
    queryOptions({
      queryKey: [
        ...statusQueries.lists(),
        {
          summary_id,
          post_val,
        },
      ],
      queryFn: () =>
        getStatuses({
          summary_id: summary_id,
          post_val: post_val,
          options,
        }),
      enabled: Boolean(summary_id && post_val),
      staleTime: 10 * 1000,
    }),
};
