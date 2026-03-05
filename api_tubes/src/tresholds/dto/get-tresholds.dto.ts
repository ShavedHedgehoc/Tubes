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
    type: String, // Swagger будет рисовать текстовое поле ввода
  })
  @IsOptional()
  @ToNumbersArray()
  // @Transform(({ value }: { value: unknown }) => {
  //   if (Array.isArray(value)) {
  //     return value.map((v) => Number(v)).filter((v) => !isNaN(v));
  //   }
  //   if (typeof value === "string" && value.trim().length > 0) {
  //     return value
  //       .split(",")
  //       .map((v) => parseInt(v.trim(), 10))
  //       .filter((v) => !isNaN(v));
  //   }
  //   return value;
  // })
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
