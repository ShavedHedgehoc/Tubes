export type StatusEntity = {
  id: number;
  summary_id: number;
  post_id: number;
  post_val: number;
  counter_value: number;
  operation_id: number | null;
  operation_description: string | null;
  maintenance_session_id: number | null;
  maintenance_description: string | null;
  idle: boolean;
  is_locked: boolean;
  employee_id: number | null;
  employee_name: string | null;
  idle_time: number | null;
  finished: boolean;
  createdAt: Date;
  extrusion_param_id: number | null;
  varnish_param_id: number | null;
  offset_param_id: number | null;
  sealant_param_id: number | null;
  // added
  laboratory_lock_reason: string | null;
  laboratory_assistant_name: string | null;
  has_laboratory_lock: boolean;
};

type StatusTableRowState =
  | "Внесение параметров"
  | "Конец блокировки"
  | "Блокировка лабораторией"
  | "Начало операции"
  | "Конец операции"
  | "Окончание работы";

export type Ids = {
  extrusion_param_id: number | null;
  varnish_param_id: number | null;
  offset_param_id: number | null;
  sealant_param_id: number | null;
  maintenance_session_id: number | null;
};

export type StatusWithIdsEntity = StatusEntity & {
  ids: Ids;
  state: StatusTableRowState;
};

export type StatusResponse = {
  statuses: StatusEntity[];
};

type SummaryBase = {
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

export type SummaryReportBase = SummaryBase & {
  conveyorName: string;
  productCode: string;
  productName: string;
  productMarking: string;
  batchName: string;
};

export type AllStatusResponse = {
  summary: SummaryReportBase;
  statuses: StatusWithIdsEntity[];
  total: number;
  totalPages: number;
};
