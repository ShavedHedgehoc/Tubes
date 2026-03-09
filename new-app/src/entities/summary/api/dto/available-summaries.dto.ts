type Batch = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  code: string;
  marking: string;
  name: string;
};

type SummaryRow = {
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

export type AvailableSummariesDto = { summaries: SummaryRow[] };
