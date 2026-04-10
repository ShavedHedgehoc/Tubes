import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteUserDto {
    @ApiProperty({ example: 1, description: "id сотрудника" })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly id: number;
}
