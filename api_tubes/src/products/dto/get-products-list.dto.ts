import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetProductsListDto {
  @ApiPropertyOptional({
    description: "Код",
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
    description: "Наименование",
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

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
