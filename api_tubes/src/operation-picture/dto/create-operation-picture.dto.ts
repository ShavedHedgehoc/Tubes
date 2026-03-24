import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOperationPictureDto {
  @ApiProperty({ example: 1, description: "id операции" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly operation_id: number;
  @ApiProperty({ example: 1, description: "id файла" })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly file_path_id: number;
}
