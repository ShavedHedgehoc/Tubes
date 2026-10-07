export type CrewStatDto = {
  crew_id: number;
  crew_name: string;
  total_weight: number;
  total_units: number;
  total_production: number;
  total_plan: number;
  defect_rate_goal: number | null;
  execution_goal: number | null;
  execution: number;
  defect_percent: number;
  idles: Record<string, number>[];
};
