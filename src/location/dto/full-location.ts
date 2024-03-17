import { IsNotEmpty, IsString, IsNumber, Matches } from "class-validator";

export class FullLocationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[\w\d]+(?:-[\w\d]+)+$/)
    number: string;

    @IsNumber()
    area: number;
}