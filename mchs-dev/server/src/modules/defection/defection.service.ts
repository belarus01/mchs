import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SDefection } from './entity/defection.entity';
import { Repository } from 'typeorm';
import { CreateDefectionDTO } from './dto/create-defection.dto';
import { DefectionNotFoundException } from './exception/defection.not-found.exception';

@Injectable()
export class DefectionService {
    constructor(@InjectRepository(SDefection, 'mchs_connection') private defectionRepository: Repository<SDefection>){}

    async createDefection(dto: CreateDefectionDTO): Promise<SDefection>{
        const defection = this.defectionRepository.create(dto);
        return this.defectionRepository.save(defection);
    }

    async getDefectionById(idDef: number): Promise<SDefection>{
        const defection = await this.defectionRepository.findOneBy({idDef});
        if(!defection){
            throw new DefectionNotFoundException(idDef);
        }
        return defection;
    }

    async getAllDefections(): Promise<SDefection[]>{
        return await this.defectionRepository.find();
    }

    async updateDefection(idDef: number, dto: CreateDefectionDTO){
        return await this.defectionRepository.update(idDef, dto);
    }

    async deleteDefectionById(idDef: number){
        return await this.defectionRepository.update(idDef, {active:0});
    }
}
