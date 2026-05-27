import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ToNumber, ToStringArray } from "src/shared";

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

  // @ApiPropertyOptional({ description: "Бригады" })
  // @IsOptional()
  // @ToNumbersArray()
  // @IsArray()
  // @IsInt({ each: true })
  // readonly crews?: number[];

  // @ApiPropertyOptional({ description: "Статусы" })
  // @IsOptional()
  // @ToNumbersArray()
  // @IsArray()
  // @IsInt({ each: true })
  // readonly states?: number[];

  // @ApiProperty({ description: "На странице", example: 10 })
  // @IsNotEmpty()
  // @ToNumber()
  // @IsNumber({}, { message: "Поле должно быть числом" })
  // readonly limit: number;

  // @ApiProperty({ description: "Страница", example: 1 })
  // @IsNotEmpty()
  // @ToNumber()
  // @IsNumber({}, { message: "Поле должно быть числом" })
  // readonly page: number;
}
