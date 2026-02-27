import { proxyApiClient } from "@/shared/api";
import { UpdateEmployeeDto } from "./dto";

export const updateEmployee = async (dto: UpdateEmployeeDto) => {
  await proxyApiClient.patch(`/employees`, dto);
};
