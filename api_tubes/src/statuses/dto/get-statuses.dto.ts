import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import { ToNumber } from "src/shared/lib/to-number.decorator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetStatusesDto {
  @ApiProperty({ example: 1, description: "id записи" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly summary_id: number;

  @ApiPropertyOptional({ description: "Посты" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly posts?: number[];

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
