import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    IsArray,
    IsBoolean,

    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { ToNumber } from "src/shared/lib/to-number.decorator";
import { ToNumbersArray } from "src/shared/lib/to-numbers-array.decorator";

export class GetUsersListDto {

    @ApiPropertyOptional({ description: "Имя" })
    @IsString()
    @IsOptional()
    readonly name?: string;

    @ApiProperty({
        description: "Сортировать ФИО по возрастанию",
    })
    @IsBoolean()
    @Transform(({ value }) => {
        return value === "true";
    })
    readonly name_asc: boolean;

    @ApiPropertyOptional({ description: "email" })
    @IsString()
    @IsOptional()
    readonly email?: string;


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
    readonly roles?: number[];

    @ApiProperty({ description: "На странице", example: 10 })
    @IsNotEmpty()
    @ToNumber()
    @IsNumber({}, { message: "Поле должно быть числом" })
    readonly limit: number;

    @ApiProperty({ description: "Страница", example: 1 })
    @IsNotEmpty()
    @ToNumber()
    @IsNumber({}, { message: "Поле должно быть числом" })
    readonly page: number;
}
