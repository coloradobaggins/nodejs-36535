import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    
    //(Los pipes transforman la data)
    //console.log({value, metadata});

    //Nos aseguramos de que los id sean mongo id validos.
    if( !isValidObjectId(value)){
      throw new BadRequestException(`${value} no es un id de mongo valido.`);
    }

    return value;
  }
}
