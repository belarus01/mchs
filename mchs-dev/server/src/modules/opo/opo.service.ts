import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SOpo } from './entity/opo.entity';
import { Repository } from 'typeorm';
import { CreateOpoDTO } from './dto/create-opo.dto';
import { OpoNotFoundException } from './exception/opo.not-found.exception';

@Injectable()
export class OpoService {
    constructor(@InjectRepository(SOpo, 'mchs_connection') private opoRepository: Repository<SOpo>){}

    async createOpo(dto: CreateOpoDTO){
        const opo = this.opoRepository.create(dto);
        return this.opoRepository.save(opo);
    }

    async getOpoById(idOpo: number){
        const opo = await this.opoRepository.findOneBy({idOpo});
        if(!opo){
            throw new OpoNotFoundException(idOpo);
        }
        return opo;
    }

    async getAllOpos(){
        return await this.opoRepository.find();
    }
    
    async updateOpo(idOpo: number, dto: CreateOpoDTO){
        return await this.opoRepository.update(idOpo, dto);
    }

    async deleteOpoById(idOpo: number){
        return await this.opoRepository.update(idOpo, {active:0});
    }
}
