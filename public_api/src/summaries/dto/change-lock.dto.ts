import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class ChangeLockDto {
  @ApiProperty({ description: "id сводки", example: "1" })
  @IsInt()
  @IsNotEmpty()
  readonly summary_id: number;

  @ApiProperty({ description: "номер поста", example: "1" })
  @IsInt()
  @IsNotEmpty()
  readonly post_val: number;

  @ApiProperty({
    description: "Причина блокировки",
    example: "Нарушение сплошности",
  })
  @IsString()
  @IsOptional()
  readonly lock_reason: string;

  @ApiProperty({ description: "Сотрудник лаборатории", example: "Иванов А.В." })
  @IsString()
  // @IsOptional()
  readonly lab_assistant: string;

  @ApiProperty({ description: "Заблокировать", example: true })
  @IsBoolean()
  readonly state: boolean;
}
