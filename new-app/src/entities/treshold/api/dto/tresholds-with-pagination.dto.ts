import { TresholdDto } from "./treshold-dto";

export type TresholdsWithPaginationDto = {
    rows: TresholdDto[];
    total: number;
};
