import { apiClient } from "@/shared/api";
import { LoginDto } from "./dto/login.dto";
import { User } from "next-auth";

export const login = async (dto: LoginDto): Promise<User> => {
  return await apiClient.post(`auth/login`, dto);
};
