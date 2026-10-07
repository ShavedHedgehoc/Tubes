import { apiClient, proxyApiClient } from "@/shared/api";
import { LabLockReasonResponse } from "../model";
import { LAB_LOCK_REASON_ENDPOINTS } from "./endpoints";
import { LabLockReasonsDto } from "./dto/lab-lock-reasons.dto";

type options = {
  isServer: boolean;
};

export async function getLabLocksReasons({
  options,
}: {
  options?: options;
}): Promise<LabLockReasonResponse> {
  const res = options?.isServer
    ? await apiClient.get<LabLockReasonsDto>(LAB_LOCK_REASON_ENDPOINTS.LIST)
    : await proxyApiClient.get<LabLockReasonsDto>(
        LAB_LOCK_REASON_ENDPOINTS.LIST,
      );

  return {
    labLockReasons: res.labLockReasons,
  };
}
