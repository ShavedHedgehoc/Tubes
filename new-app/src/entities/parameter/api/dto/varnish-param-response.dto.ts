import { VarnishParamDto } from "./params.dto";
import { SummaryDto } from "./summary.dto";
import { TresholdDto } from "./treshold.dto";

export type VarnishParamResponse = {
  summary: SummaryDto;
  parameters: VarnishParamDto;
  tresholds: TresholdDto;
  prev: number | null;
  next: number | null;
};
