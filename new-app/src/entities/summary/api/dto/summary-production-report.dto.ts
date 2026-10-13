import { SummaryDto } from "./summary.dto";

type SummaryReportDto = Omit<
  SummaryDto,
  | "execution"
  | "defectPercent"
  | "unitWeight"
  | "defectRateGoal"
  | "executionGoal"
  | "_count"
>;

export type SummariesProductionReportDto = {
  startDate: Date;
  endDate: Date;
  rows: SummaryReportDto[];
};
