import { queryOptions } from "@tanstack/react-query";
import { getCrews } from "./get-crews";

export const crewsQueries = {
  all: () => ["crews"],
  lists: () => [...crewsQueries.all(), "list"],
  list: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...crewsQueries.lists()],
      queryFn: () => getCrews({ options: options }),
    }),
};
