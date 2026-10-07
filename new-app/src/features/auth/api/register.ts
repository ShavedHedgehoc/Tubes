import { proxyApiClient } from "@/shared/api";
import { RegisterDto } from "./dto/register.dto";

export const register = async (dto: RegisterDto) => {
  await proxyApiClient.post(`/auth/register`, dto);
};
