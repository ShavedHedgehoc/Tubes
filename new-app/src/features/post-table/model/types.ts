export type StatusTableRowState =
  | "Внесение параметров"
  | "Блокировка лабораторией"
  | "Конец блокировки"
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

export type StatusTableRow = {
  id: number;
  date: Date;
  employee: string | null;
  state: StatusTableRowState;
  operation: string | null;
  ids: Ids;
};
