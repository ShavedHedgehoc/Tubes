export type ProductEntity = {
  id: number;
  code: string;
  marking: string;
  name: string;
  unit_weight: number | null;
};

type FilePath = {
  id: number;
  filename: string;
  path: string;
  description: string;
};

type ProductPicture = {
  picture_record_id: number;
  picture_order: number;
  picture_file: FilePath;
};

export type ProductRow = ProductEntity & {
  product_pictures: ProductPicture[];
};

export type ProductResponse = {
  products: ProductRow[];
  total: number;
  totalPages: number;
};
