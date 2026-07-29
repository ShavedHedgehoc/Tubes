type StatusDto = {
  id: number;
  summary_id: number;
  post_id: number;
  counter_value: number;
  operation_id: number | null;
  maintenance_session_id: number | null;
  idle: false;
  employee_id: number | null;
  idle_time: number | null;
  finished: boolean;
  is_locked: boolean;
  createdAt: Date;
  extrusion_param_id: number | null;
  varnish_param_id: number | null;
  offset_param_id: number | null;
  sealant_param_id: number | null;
};

type Employee = {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
  banned: boolean;
};

type Operation = {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
};

type Maintenance = {
  id: number;
  value: string;
  min_rank_id: number;
  description: string;
  post_id: number;
};

type MaintenanceSession = {
  id: number;
  maintenance_id: number;
  post_id: number;
  start_time: Date;
  end_time: Date;
  total_duration: number;
  work_duration: number;
  maintenance: Maintenance;
};

type Post = {
  id: number;
  value: number;
  name: string;
};

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

type SummaryDto = {
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
  shift: number;
};

type LaboratoryLockReason = {
  id: number;
  value: string;
};

type LaboratoryAssistant = {
  id: number;
  name: string;
};

type LaboratoryLock = {
  id: number;
  laboratory_lock_reason_id: number;
  laboratory_assistant_id: number;
  createdAt: Date;
  summary_id: number;
  post_id: number;
  is_active: boolean;
  closedAt: Date | null;
  laboratory_assistant: LaboratoryAssistant;
  laboratory_lock_reason: LaboratoryLockReason;
};

export type StatusRow = StatusDto & {
  employee: Employee | null;
  operation: Operation | null;
  maintenance_session: MaintenanceSession | null;
  laboratory_lock: LaboratoryLock | null;
  post: Post;
};

export type StatusListResponseDto = {
  summary: SummaryDto;
  statuses: StatusRow[];
  total: number;
};
