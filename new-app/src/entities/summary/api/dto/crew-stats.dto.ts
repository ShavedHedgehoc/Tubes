import { CrewStatDto } from "./crew-stat.dto";

export type CrewStatsDto = {
  all: CrewStatDto[];
} & Record<string, CrewStatDto[]>;
