import { IsNotEmpty, IsString, IsNumber, Matches } from "class-validator";

export class InputLocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[\w\d]+(?:-[\w\d]+)+$/)
    number: string;

    @IsNumber()
    area: number;
}