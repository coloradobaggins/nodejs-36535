import { IsNumber, IsString } from "class-validator";

export class CreateFilmDto{

    //Que espero recibir de POST? ..Name, year
    //Readonly, es exacto lo que manda el cliente

    @IsString({message: `Poner una buena pelicula...`})
    readonly name: string;

    @IsNumber()
    readonly year: number;

}