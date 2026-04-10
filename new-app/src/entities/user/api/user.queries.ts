import { queryOptions } from "@tanstack/react-query";
import { UserParams } from "../model";
import { getUsers } from "./get-users";
import { getUser } from "./get-user";

export const userQueries = {
  all: () => ["users"],
  lists: () => [...userQueries.all(), "list"],
  list: (params: UserParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...userQueries.lists(),
        {
          ...params,
          roles: Array.isArray(params.roles)
            ? [...params.roles].sort()
            : (params.roles ?? null),
          banned: params.banned ?? null,
          name: params.name ?? null,
          email: params.email ?? null,
        },
      ],
      queryFn: () =>
        getUsers({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  details: () => [...userQueries.all(), "detail"],
  detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => getUser({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),

};
