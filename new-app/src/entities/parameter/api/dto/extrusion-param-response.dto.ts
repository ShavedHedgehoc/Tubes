import { ExtrusionParamDto } from "./params.dto";
import { SummaryDto } from "./summary.dto";
import { TresholdDto } from "./treshold.dto";

export type ExtrusionParamResponse = {
  summary: SummaryDto;
  parameters: ExtrusionParamDto;
  tresholds: TresholdDto;
  prev: number | null;
  next: number | null;
};
