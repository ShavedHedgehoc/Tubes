import { proxyApiClient } from "@/shared/api";
import { PRODUCT_ENDPOINTS } from "./endpoint";
import { DeleteProductPictureRecordDto } from "./dto/delete-product-picture-record.dto";

export const deleteProductPictureRecord = async (
  dto: DeleteProductPictureRecordDto,
) => {
  await proxyApiClient.delete(PRODUCT_ENDPOINTS.DELETE_PICTURE_RECORD, dto);
};
