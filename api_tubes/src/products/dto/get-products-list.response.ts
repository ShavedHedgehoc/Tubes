class Product {
  id: number;
  code: string;
  marking: string;
  name: string;
}

class FilePath {
  id: number;
  name: string;
  path: string;
  description: string;
}
class Picture {
  id: number;
  product_id: number;
  file_path_id: number;
  order: number;
}

class PictureRow extends Picture {
  file_path: FilePath;
}

class ProductRow extends Product {
  unit_weight: number | null;
  product_pictures: PictureRow[];
}

export class GetProductsListResponse {
  rows: ProductRow[];
  total: number;
}
