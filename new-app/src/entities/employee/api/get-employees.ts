import { EmployeeParams, EmployeesResponse } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { EmployeesWithPaginationDto } from "./dto";

export type GetEmployeesArgs = EmployeeParams & {
  options?: { isServer: boolean };
};

export async function getEmployees({
  options,
  ...params
}: GetEmployeesArgs): Promise<EmployeesResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<EmployeesWithPaginationDto>(
    "employees/list",
    params,
  );
  return {
    employees: res.employees ?? [],
    total: res.total,
    totalPages: Math.ceil(res.total / (params.limit || 10)),
  };
}
