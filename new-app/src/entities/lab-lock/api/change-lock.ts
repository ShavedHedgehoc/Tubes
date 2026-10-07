import { proxyApiClient } from "@/shared/api";
import { ChangeLockDto } from "./dto/change-lock.dto";

export const changeLock = async (dto: ChangeLockDto) => {
  await proxyApiClient.post(`/laboratory-lock/change-lock`, dto);
};
