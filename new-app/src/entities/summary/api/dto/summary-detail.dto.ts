// то, что возвращает бэкенд

export type SummaryDetailDto = {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: string;
  batch_name: string;
  product_code: string;
  product_name: string;
  marking: string;
  conveyor_name: string;
  shift: number;
  crew_id: number | null;

  // production,
  // execution,
  // defectPercent:number,
  // unitWeight:number|null,
  // crewName:string|null
};
