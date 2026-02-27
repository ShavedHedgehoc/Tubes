import { EmployeeEntity } from "../model";
import { apiClient, proxyApiClient } from "@/shared/api";
import { EmployeeDto } from "./dto";

export type GetEmployeeArgs = {
  id: string | null;
  options?: { isServer: boolean };
};

export const getEmployee = async ({
  options,
  id,
}: GetEmployeeArgs): Promise<EmployeeEntity> => {
  const client = options?.isServer ? apiClient : proxyApiClient;
  const res = await client.get<EmployeeDto>(`/employees/by_id/${id}`);
  return res;
};
