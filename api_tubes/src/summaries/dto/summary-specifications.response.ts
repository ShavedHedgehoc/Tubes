class ProductDto {
  id: number;
  code: string;
  marking: string;
  name: string;
}

class BatchDto {
  id: number;
  name: string;
}

class ConveyorDto {
  id: number;
  name: string;
}

class SummaryDto {
  id: number;
  date: Date;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  isSetup: boolean;
  product: ProductDto;
  batch: BatchDto;
  conveyor: ConveyorDto;
  //   production: number | null;
  //   productionPerBoxes: number | null;
  //   execution: number | null;
  //   defectPercent: number | null;
  //   unitWeight: number | null;
  //   crewName: string | null;
  shift: number;
}

class Post {
  id: number;
  value: number;
  name: string;
}

export class SpecificationRow {
  materialId: number;
  materialCode1C: string;
  materialName: string;
  currentLotId: number | null;
  currentLot: string | null;
  post: Post;
}
export class SummarySpecificationsResponse {
  summary: SummaryDto;
  specifications: SpecificationRow[];
}
