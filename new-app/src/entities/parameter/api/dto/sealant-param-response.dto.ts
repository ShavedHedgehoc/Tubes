import { SealantParamDto } from "./params.dto";
import { SummaryDto } from "./summary.dto";
import { TresholdDto } from "./treshold.dto";

export type SealantParamResponse = {
  summary: SummaryDto;
  parameters: SealantParamDto;
  tresholds: TresholdDto;
  prev: number | null;
  next: number | null;
};
