import { proxyApiClient } from "@/shared/api";
import { CreateProductPictureRecordDto } from "./dto/create-product-picture-record.dto";
import { PRODUCT_ENDPOINTS } from "./endpoint";

export const createProductPictureRecord = async (
  dto: CreateProductPictureRecordDto,
) => {
  await proxyApiClient.post(PRODUCT_ENDPOINTS.CREATE_PICTURE_RECORD, dto);
};
