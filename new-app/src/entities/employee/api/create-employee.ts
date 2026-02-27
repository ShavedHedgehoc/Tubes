import { proxyApiClient } from "@/shared/api";
import { CreateEmployeeDto } from "./dto";

export const createEmployee = async (dto: CreateEmployeeDto) => {
  await proxyApiClient.post(`/employees`, dto);
};
