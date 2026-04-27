import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ToNumber } from "src/shared/lib/to-number.decorator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetSummariesListDto {
  @ApiProperty({ description: "Дата начала", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly start_date: Date;

  @ApiProperty({ description: "Дата окончания", example: "2025-12-19" })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly end_date: Date;

  @ApiPropertyOptional({ description: "Код" })
  @IsString()
  @IsOptional()
  readonly code?: string;

  @ApiPropertyOptional({ description: "Конвейеры" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly conveyors?: number[];

  @ApiPropertyOptional({ description: "Бригады" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly crews?: number[];

  @ApiPropertyOptional({ description: "Статусы" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly states?: number[];

  @ApiProperty({ description: "На странице", example: 10 })
  @IsNotEmpty()
  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  readonly limit: number;

  @ApiProperty({ description: "Страница", example: 1 })
  @IsNotEmpty()
  @ToNumber()
  @IsNumber({}, { message: "Поле должно быть числом" })
  readonly page: number;
}
