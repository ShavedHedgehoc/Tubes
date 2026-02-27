import { SummaryDto } from "./summary.dto";

export type SummariesWithPaginationDto = {
  rows: SummaryDto[];
  total: number;
};
