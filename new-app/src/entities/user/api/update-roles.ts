import { proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";
import { UpdateRolesDto } from "./dto/update-roles.dto";

export const updateRoles = async (dto: UpdateRolesDto) => {
  await proxyApiClient.post(USER_ENDPOINTS.UPDATE_ROLES, dto);
};
