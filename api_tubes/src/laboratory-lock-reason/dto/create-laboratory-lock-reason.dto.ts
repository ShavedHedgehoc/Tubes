import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateLaboratoryLockReasonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  readonly value: string;
}
