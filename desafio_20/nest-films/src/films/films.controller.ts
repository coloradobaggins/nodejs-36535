import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFilmDto } from './dtos/create-film.dto';
import { UpdateFilmDto } from './dtos/update-car.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {

  /*
    La inyeccion de dependencias se realiza en el constructor. Para consumir lo que sea publico de mi servicio films 
    Cuando nest crea la instancia de este controlador va a crear la del servicio y la proporciona.
  */
  constructor(
    private readonly filmsService: FilmsService
  ){}

  @Get()
  getAllFilms() {

    return this.filmsService.findAll();
    
  }

  
  @Get(':id')
  getFilmById( @Param('id', ParseUUIDPipe) id: string ) {

    console.log({id});

    const film = this.filmsService.findOneById(id);
    
    return film;
  }

  @Post()
  createFilm( @Body() createFilmDto: CreateFilmDto ) {

    return this.filmsService.create(createFilmDto);
  }

  @Patch(':id')
  updateFilm( 
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateFilmDto: UpdateFilmDto )
  {
    
    return this.filmsService.update(id, updateFilmDto);
  }
  
  @Delete(':id')
  deleteFilm( @Param('id', ParseUUIDPipe) id: string ){
    return this.filmsService.delete(id);
  }

}
