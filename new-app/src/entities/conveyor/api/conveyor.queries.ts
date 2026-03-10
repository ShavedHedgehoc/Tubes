import { queryOptions } from "@tanstack/react-query";
import { getConveyorsView } from "./get-conveyors-view";

export const conveyorQueries = {
  all: () => ["conveyorss"],
  views: () => [...conveyorQueries.all(), "views"],
  view: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...conveyorQueries.views()],
      queryFn: () =>
        getConveyorsView({
          options,
        }),
      staleTime: 60 * 1000,
    }),
};
