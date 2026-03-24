export type ProductDto = {
  id: number;
  code: string;
  marking: string;
  name: string;
};

type FilePath = {
  id: number;
  name: string;
  path: string;
  description: string;
};

type ProductPicture = {
  id: number;
  product_id: number;
  file_path_id: number;
  order: number;
};

type ProductPictureWithPath = ProductPicture & {
  file_path: FilePath;
};
export type ProductWithPicturesDto = ProductDto & {
  product_pictures: ProductPictureWithPath[];
};
