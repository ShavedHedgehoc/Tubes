import { queryOptions } from "@tanstack/react-query";
import { getEmployees } from "./get-employees";
import { getEmployee } from "./get-employee";
import { EmployeeParams } from "../model";

export const employeeQueries = {
  all: () => ["employees"],
  lists: () => [...employeeQueries.all(), "list"],
  list: (params: EmployeeParams, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [
        ...employeeQueries.lists(),
        {
          ...params,
          ranks: Array.isArray(params.ranks)
            ? [...params.ranks].sort()
            : (params.ranks ?? null),
          banned: params.banned ?? null,
          name: params.name ?? null,
        },
      ],
      queryFn: () =>
        getEmployees({
          ...params,
          options,
        }),
      staleTime: 60 * 1000,
    }),
  details: () => [...employeeQueries.all(), "detail"],
  detail: (id: string | null, options?: { isServer: boolean }) =>
    queryOptions({
      queryKey: [...employeeQueries.details(), id],
      queryFn: () => getEmployee({ id, options }),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }),
};
