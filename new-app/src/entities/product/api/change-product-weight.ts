import { proxyApiClient } from "@/shared/api";
import { PRODUCT_ENDPOINTS } from "./endpoint";
import { ChangeProductWeightdDto } from "./dto/change-product-weight.dto";

export const changeProductWeight = async (dto: ChangeProductWeightdDto) => {
  await proxyApiClient.patch(PRODUCT_ENDPOINTS.CHANGE_WEIGHT, dto);
};
