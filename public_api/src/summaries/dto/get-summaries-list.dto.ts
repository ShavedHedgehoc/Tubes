import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ToStringArray } from "src/shared";

export class GetSummariesListDto {
  @ApiProperty({ description: "Дата начала", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({ description: "Дата окончания", example: "2026-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly endDate: Date;

  @ApiPropertyOptional({ description: "Код" })
  @IsString()
  @IsOptional()
  readonly productCode?: string;

  @ApiPropertyOptional({ description: "Партия" })
  @IsString()
  @IsOptional()
  readonly batchName?: string;

  @ApiPropertyOptional({ description: "Конвейеры" })
  @IsOptional()
  @ToStringArray()
  @IsArray()
  @IsString({ each: true })
  readonly conveyors?: string[];
}
