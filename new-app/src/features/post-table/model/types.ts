export type StatusTableRowState =
  | "Внесение параметров"
  | "Начало операции"
  | "Конец операции"
  | "Окончание работы";

export type StatusTableRow = {
  id: number;
  date: Date;
  employee: string | null;
  state: StatusTableRowState;
  operation: string | null;
};
