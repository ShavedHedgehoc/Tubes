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

type TubePostStatusRecordCount = {
  statuses: number;
};

export type SummaryDto = {
  id: number;
  date: string;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  product: ProductEntity;
  batch: BatchEntity;
  conveyor: ConveyorEntity;
  production: number | null;
  execution: number | null;
  defectPercent: number | null;
  unitWeight: number | null;
  crewName: string | null;
  defectRateGoal: number | null;
  executionGoal: number | null;

  shift: number;
  _count: TubePostStatusRecordCount;
};
