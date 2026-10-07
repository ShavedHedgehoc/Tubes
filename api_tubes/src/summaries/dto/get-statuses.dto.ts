import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetStatusesDto {
  @ApiProperty({ example: 1, description: "id записи" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly summary_id: number;

  @ApiPropertyOptional({ description: "Разряды" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly posts?: number[];
}
