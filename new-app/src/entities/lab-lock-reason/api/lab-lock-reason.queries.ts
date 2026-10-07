import { queryOptions } from "@tanstack/react-query";
import { getLabLocksReasons } from "./get-lab-lock-reasons";

export const labLockReasonQueries = {
  all: () => ["lab-lock-reasons"],
  lists: () => [...labLockReasonQueries.all(), "list"],
  list: (options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...labLockReasonQueries.lists()],
      queryFn: () => getLabLocksReasons({ options: options }),
    }),
};
