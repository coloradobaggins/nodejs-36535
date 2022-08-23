import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateFilmDto{

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsNumber()
    @IsOptional()
    readonly year?: number;

}