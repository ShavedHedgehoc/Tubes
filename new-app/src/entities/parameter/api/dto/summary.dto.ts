type ConveyorDto = {
  id: number;
  name: string;
};

type BatchDto = {
  id: number;
  name: string;
};

type ProductDto = {
  id: number;
  code: string;
  marking: string;
  name: string;
};

export type SummaryDto = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: string;
  shift: number;
  product: ProductDto;
  batch: BatchDto;
  conveyor: ConveyorDto;
};
