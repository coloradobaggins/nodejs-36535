import { join } from 'path';
import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

//Decorador @Module
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nestjsFilms'),
    FilmsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
