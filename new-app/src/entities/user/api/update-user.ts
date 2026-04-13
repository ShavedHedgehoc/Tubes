import { proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";
import { UpdateUserDto } from "./dto/update-user.dto";

export const updateUser = async (dto: UpdateUserDto) => {
  await proxyApiClient.patch(USER_ENDPOINTS.UPDATE, dto);
};
