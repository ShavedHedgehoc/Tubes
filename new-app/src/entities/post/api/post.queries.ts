import { queryOptions } from "@tanstack/react-query";
import { getPosts } from "./get-posts";

export const postsQueries = {
  all: () => ["posts"],
  lists: () => [...postsQueries.all(), "list"],
  list: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...postsQueries.lists()],
      queryFn: () => getPosts({ options: options }),
    }),
};
