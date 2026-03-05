import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetEmployeesListDto {
  @ApiPropertyOptional({
    description: "Имя",
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({ description: "Запрет входа" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly banned?: number[];

  @ApiPropertyOptional({ description: "Разряды" })
  @IsOptional()
  @ToNumbersArray()
  @IsArray()
  @IsInt({ each: true })
  readonly ranks?: number[];

  @ApiProperty({
    description: "Сортировать ФИО по возрастанию",
  })
  @IsBoolean()
  @Transform(({ value }) => {
    return value === "true";
  })
  readonly name_asc: boolean;

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly limit: number;

  @ApiProperty({
    description: "На странице",
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly page: number;
}
