import { proxyApiClient } from "@/shared/api";
import { LAB_LOCK_REASON_ENDPOINTS } from "./endpoints";
import { CreateLabLockReasonDto } from "./dto/create-lab-lock-reason.dto";
import { LabLockReasonDto } from "./dto/lab-lock-reasons.dto";
import { LabLockReasonEntity } from "../model";

export const createLabLockReason = async (
  dto: CreateLabLockReasonDto,
): Promise<LabLockReasonEntity> => {
  const res = await proxyApiClient.post<LabLockReasonDto>(
    LAB_LOCK_REASON_ENDPOINTS.CREATE,
    dto,
  );
  return res;
};
