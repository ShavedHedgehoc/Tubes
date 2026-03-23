import { proxyApiClient } from "@/shared/api";
import { CreateOperationPictureRecordDto } from "./dto/create-operation-picture-record.dto";
import { OPERATION_ENDPOINTS } from "./endpoint";

export const createOperationPictureRecord = async (
  dto: CreateOperationPictureRecordDto,
) => {
  await proxyApiClient.post(OPERATION_ENDPOINTS.CREATE_PICTURE_RECORD, dto);
};
