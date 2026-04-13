import { queryOptions } from "@tanstack/react-query";
import { getRanks } from "./get-ranks";

export const ranksQueries = {
  all: () => ["ranks"],
  lists: () => [...ranksQueries.all(), "list"],
  list: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...ranksQueries.lists()],
      queryFn: () => getRanks({ options: options }),
    }),
};
