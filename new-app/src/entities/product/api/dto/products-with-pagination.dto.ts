import { ProductWithPicturesDto } from "./product.dto";

export type ProductsWithPaginationDto = {
  rows: ProductWithPicturesDto[];
  total: number;
};
