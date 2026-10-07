import { OffsetParamDto } from "./params.dto";
import { SummaryDto } from "./summary.dto";
import { TresholdDto } from "./treshold.dto";

export type OffsetParamResponse = {
  summary: SummaryDto;
  parameters: OffsetParamDto;
  tresholds: TresholdDto;
  prev: number | null;
  next: number | null;
};
