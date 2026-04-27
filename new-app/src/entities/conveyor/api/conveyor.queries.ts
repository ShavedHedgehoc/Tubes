import { queryOptions } from "@tanstack/react-query";
import { getConveyorsView } from "./get-conveyors-view";
import { getConveyors } from "./get-conveyors";

export const conveyorQueries = {
  all: () => ["conveyorss"],
  lists: () => [...conveyorQueries.all(), "list"],
  list: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...conveyorQueries.lists()],
      queryFn: () => getConveyors({ options: options }),
    }),
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
