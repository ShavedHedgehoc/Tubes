// move to product entity
type ProductEntity = {
  id: number;
  code: string;
  marking: string;
  name: string;
};
// move to batch entity
type BatchEntity = {
  id: number;
  name: string;
};
//move to conveyor entity
type ConveyorEntity = {
  id: number;
  name: string;
};

type PostStatusCount = {
  extrusion_statuses: number;
  varnish_statuses: number;
  offset_statuses: number;
  sealant_statuses: number;
};

export type SummaryEntity = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  product: ProductEntity;
  batch: BatchEntity;
  conveyor: ConveyorEntity;
  date: Date;
  shift: number;
  _count: PostStatusCount;
};

//тип для фронтенда
export type SummaryResponse = {
  summaries: SummaryEntity[];
  total: number;
  totalPages: number;
};

export type SummaryUploadDataRow = {
  code1C: string;
  product_marking: string;
  product_name: string;
  batch: string;
  plan: string;
  conveyor: string;
  specification: string;
  shift: string;
};

export type ValError = {
  row: number;
  field: string;
  error: string;
};


