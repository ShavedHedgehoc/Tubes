import { SummaryUploadDataRow } from "../../model";

export type SummaryUploadDto = {
  summaryDate: string;
  update: boolean;
  rows: SummaryUploadDataRow[];
};
