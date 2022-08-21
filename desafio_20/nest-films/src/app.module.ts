import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';

//Decorador @Module
@Module({
  imports: [FilmsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
