// move to product entity
type Product = {
  id: number;
  code: string;
  marking: string;
  name: string;
};
// move to batch entity
type Batch = {
  id: number;
  name: string;
};
//move to conveyor entity
type Conveyor = {
  id: number;
  name: string;
};

export type SummaryBase = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  shift: number;
};

type PostStatusCount = {
  statuses: number;
};

type AvailableSummaryRow = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  shift: number;
  product: Product;
  batch: Batch;
};

export type SummaryAvailable = SummaryBase & {
  product: Product;
  batch: Batch;
};

// Полная сущность с отношениями
export type SummaryEntity = SummaryAvailable & {
  conveyor: Conveyor;
  _count: PostStatusCount;
};

//тип для фронтенда
export type SummaryResponse = {
  summaries: SummaryEntity[];
  total: number;
  totalPages: number;
};

export type SummuryAvailableResponse = {
  summaries: AvailableSummaryRow[];
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

type SummaryWithStatusesBase = SummaryBase & {
  conveyorName: string;
  batchName: string;
  productName: string;
  productCode: string;
  productMarking: string;
};

type StatusRow = {
  id: number;
  summary_id: number;
  post_id: number;
  post_val: number;
  counter_value: number;
  operation_id: number | null;
  operation_description: string | null;
  idle: false;
  employee_id: number | null;
  employee_name: string | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
};

export type SummaryStatusesResponse = SummaryWithStatusesBase & {
  statuses: StatusRow[];
};
