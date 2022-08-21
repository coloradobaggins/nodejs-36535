import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateFilmDto{

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly year?: number;

}