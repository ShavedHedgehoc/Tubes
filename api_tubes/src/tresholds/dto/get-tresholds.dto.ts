import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetTresholdsDto {
  @ApiPropertyOptional({
    description: "Код 1С",
  })
  @IsString()
  @IsOptional()
  readonly code?: string;

  @ApiPropertyOptional({
    description: "Артикул",
  })
  @IsString()
  @IsOptional()
  readonly marking?: string;

  @ApiPropertyOptional({
    description: "Конвейеры (через запятую: 1,2,3)",
    type: String,
  })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly conveyors?: number[];

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly limit: number;

  @ApiProperty({
    description: "Страница",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  readonly page: number;
}
