import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SSoato } from './entity/soato.entity';

@Injectable()
export class SoatoService {
    constructor(@InjectRepository(SSoato, 'mchs_connection') private soatoRepository: Repository<SSoato>){

    }

    async getAll(): Promise<SSoato[]>{
        const objects = await this.soatoRepository.find();
        console.log(objects[1].name);
        return objects;
    }
}
