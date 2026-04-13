import { queryOptions } from "@tanstack/react-query";
import { getRoles } from "./get-roles";

export const rolesQueries = {
  all: () => ["roles"],
  lists: () => [...rolesQueries.all(), "list"],
  list: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...rolesQueries.lists()],
      queryFn: () => getRoles({ options: options }),
    }),
};
