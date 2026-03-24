import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteRecordDto {
  @ApiProperty({ example: 1, description: "id продукта" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly product_id: number;
  @ApiProperty({ example: 1, description: "id файла" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly file_path_id: number;
}
