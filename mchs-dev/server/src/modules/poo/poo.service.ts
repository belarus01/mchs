import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePooDTO } from './dto/create-poo.dto';
import { SPoo } from './entity/poo.entity';
import { Repository } from 'typeorm';
import { PooNotFoundException } from './exception/poo.not-found.exception';

@Injectable()
export class PooService {
    constructor(@InjectRepository(SPoo, 'doc_connection') private pooRepository: Repository<SPoo>){}

    async createPoo(dto: CreatePooDTO){
        const poo = this.pooRepository.create(dto);
        return this.pooRepository.save(poo);
    }

    async getPooById(idPoo: number){
        const poo = await this.pooRepository.findOneBy({idPoo});
        if(!poo){
            throw new PooNotFoundException(idPoo);
        }
        return poo;
    }

    async getAllPoos(){
        return await this.pooRepository.find();
    }
    
    async updatePoo(idPoo: number, dto: CreatePooDTO){
        return await this.pooRepository.update(idPoo, dto);
    }

    async deletePoo(idPoo: number){
        return await this.pooRepository.update(idPoo, {active:0});
    }
}
