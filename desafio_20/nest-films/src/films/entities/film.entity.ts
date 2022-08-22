import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

@Schema()
export class Film extends Document{

    //id: string .. lo crea mongo

    @Prop({
        unique: true,
        index: true
    })
    name:string;

    @Prop({
        unique: true,
        index: true
    })
    year: number;

}

export const FilmSchema = SchemaFactory.createForClass( Film );