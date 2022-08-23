import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateFilmDto, UpdateFilmDto } from './dtos'
//import { Film } from './interfaces/film.interface';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsService {

    constructor(

        @InjectModel( Film.name)
        private readonly filmModel: Model<Film>

    ){}

    
    findAll(){
        return this.filmModel.find();
    }
    

    async findOneById(id: string){

        let film: Film; //(Entity Film)

        //MongoID
        if(isValidObjectId(id)){
            film = await this.filmModel.findById(id);
        }

        return film;

    }

    async create( createFilmDto: CreateFilmDto ){
        
        try{

            const newFilm = await this.filmModel.create(createFilmDto);
            return newFilm;

        }catch(err){
            this.handleExceptions(err);
        }
        
    }

    async update( id: string, updateFilmDto: UpdateFilmDto ){
 
        const film = await this.findOneById(id);

        try{

            const updated = await film.updateOne(updateFilmDto, { new:true});
            return updated;

        }catch(err){

            this.handleExceptions(err);
        }
       
    }


    async delete(id: string){

        /*
            const film = await this.findOneById(id);
            await film.deleteOne();
        */
        //const result = await this.filmModel.findByIdAndDelete(id);

        const { deletedCount } = await this.filmModel.deleteOne({_id: id});
        if(deletedCount === 0){
            throw new BadRequestException(`Film con id ${id} no encontraso`);
        }

        return;
    }

    //Excepciones no controladas..
    private handleExceptions(error: any){

        if(error.code === 11000){
            throw new BadRequestException(`La pelicula ya existe en la db. ${JSON.stringify(error.keyValue)}`)
        }
        console.log(error);
        throw new InternalServerErrorException(`No se puede crear film en db. Checkear logs del servidor.`);


    }

}
