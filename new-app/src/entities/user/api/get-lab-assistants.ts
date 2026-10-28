import { apiClient, proxyApiClient } from "@/shared/api";
import { USER_ENDPOINTS } from "./endpoint";
import { LabAssistantResponse } from "../model";
import { LabAssistantsDto } from "./dto/lab-assistants.dto";

export type GetLabAssistantsArgs = {
  options?: { isServer: boolean };
};

export async function getLabAssistants({
  options,
}: GetLabAssistantsArgs): Promise<LabAssistantResponse> {
  const client = options?.isServer ? apiClient : proxyApiClient;

  const res = await client.get<LabAssistantsDto>(
    USER_ENDPOINTS.LAB_ASSISTANTS_LIST,
  );

  return res;
}
