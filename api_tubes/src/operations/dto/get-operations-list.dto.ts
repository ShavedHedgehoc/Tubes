import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetOperationsListDto {
  @ApiPropertyOptional({
    description: "Код",
  })
  @IsString()
  @IsOptional()
  readonly value?: string;

  @ApiPropertyOptional({
    description: "Описание",
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ description: "Активность" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly isInactive?: number[];

  @ApiPropertyOptional({ description: "Разряды" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly posts?: number[];

  @ApiPropertyOptional({ description: "Разряды" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly min_ranks?: number[];

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @ApiProperty({
    description: "Страница",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly page: number;
}
