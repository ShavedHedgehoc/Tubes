import { proxyApiClient } from "@/shared/api";
import { OPERATION_ENDPOINTS } from "./endpoint";
import { DeleteOperationPictureRecordDto } from "./dto/delete-operation-picture-record.dto";

export const deleteOperationPictureRecord = async (
  dto: DeleteOperationPictureRecordDto,
) => {
  await proxyApiClient.delete(OPERATION_ENDPOINTS.DELETE_PICTURE_RECORD, dto);
};
