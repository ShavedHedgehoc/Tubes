import { EmployeeEntity } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { EmployeeDto } from "./dto";
import { EMPLOYEE_ENDPOINTS } from "./endpoint";

export type GetEmployeeArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getEmployee = async ({
  options,
  id,
}: GetEmployeeArgs): Promise<EmployeeEntity> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<EmployeeDto>(
    `${EMPLOYEE_ENDPOINTS.DETAIL}${id}`,
  );
  return res;
};
