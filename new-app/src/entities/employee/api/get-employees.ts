import { EmployeeParams, EmployeesResponse } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { EmployeesWithPaginationDto } from "./dto";
import { EMPLOYEE_ENDPOINTS } from "./endpoint";
import { DEFAULT_PAGE_LIMIT } from "../model/constants";

export type GetEmployeesArgs = EmployeeParams & {
  options?: { isServer: boolean };
};

export async function getEmployees({
  options,
  ...params
}: GetEmployeesArgs): Promise<EmployeesResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<EmployeesWithPaginationDto>(
    EMPLOYEE_ENDPOINTS.LIST,
    params,
  );
  return {
    employees: res.employees ?? [],
    total: res.total,
    totalPages: Math.ceil(res.total / (params.limit || DEFAULT_PAGE_LIMIT)),
  };
}
