import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateFilmDto, UpdateFilmDto } from './dtos'

import { Film } from './interfaces/film.interface';

@Injectable()
export class FilmsService {

    private films: Film[] = [
        {
            id: uuid(),
            name: 'Scare Face',
            year: 1990
        },
        {
            id: uuid(),
            name: 'Lord Of the Rings',
            year: 2004
        },
        {
            id: uuid(),
            name: 'E.T.',
            year: 1994
        }
    ]
    
    findAll(){
        return this.films;
    }

    findOneById(id: string){

        const findedFilm = this.films.find((f)=> f.id === id);

        if(!findedFilm) throw new NotFoundException(`Film con id: ${id} not found`);

        return findedFilm;

    }

    create( createFilmDto: CreateFilmDto ){

        const film: Film = {
            id: uuid(),
            ...createFilmDto
        }
        

        this.films.push(film);

        return film;
    }

    update( id: string, updateFilmDto: UpdateFilmDto ){

        let filmDB = this.findOneById(id);

        if(updateFilmDto.id && updateFilmDto.id !== id){
            throw new BadRequestException(`Si envia el id por el body, debe ser igual al de params..`)
        }

        this.films = this.films.map( film => {

            if(film.id === id){
                filmDB = {
                    ...filmDB, 
                    ...updateFilmDto,  //Reemplazo con todos los items a filmDB
                    id                  // Reemplazo si me mandan el id en el body con el id que viene por param. Para evitar que me actualice el id si me lo mandan mal por el body
                }
            }

            return film;

        });

        return filmDB;
    }


    delete(id: string){

        const film = this.findOneById(id);

        this.films = this.films.filter(film => film.id !== id);
        
    }

}
