import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, FilmSchema } from './entities/film.entity';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Film.name,  //name extiende del documento, en la entidad
        schema: FilmSchema
      },                  //Si tengo mas modelos van despues de la coma
    ])
  ]
})
export class FilmsModule {}
