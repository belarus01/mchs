import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SOon } from './entity/oon.entity';
import { Repository } from 'typeorm';
import { CreateOonDTO } from './dto/create-oon.dto';
import { OonNotFoundException } from './exception/oon.not-found.exception';

@Injectable()
export class OonService {
    constructor(@InjectRepository(SOon, 'mchs_connection') private oonRepository: Repository<SOon>){}

    async createOon(dto: CreateOonDTO){
        const oon = this.oonRepository.create(dto);
        return this.oonRepository.save(oon);
    }

    async getOonById(idType: number){
        const oon = await this.oonRepository.findOneBy({idType});
        if(!oon){
            throw new OonNotFoundException(idType);
        }
        return oon;
    }

    async getAllOons(){
        return await this.oonRepository.find();
    }
    
    async updateOon(idType: number, dto: CreateOonDTO){
        return await this.oonRepository.update(idType, dto);
    }

    async deleteOonById(idType: number){
        return await this.oonRepository.update(idType, {active:0});
    }
}
