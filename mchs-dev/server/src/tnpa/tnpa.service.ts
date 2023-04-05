import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { STnpaList } from './entity/tnpaList.entity';
import { STnpaStrElem } from './entity/tnpaStrElem.entity';
import { TnpaListNotFoundException } from './exception/tnpaList.not-found.exception';
import { TnpaStrElemNotFoundException } from './exception/tnpaStrElem.not-found.exception';
import { CreateTnpaListDTO } from './dto/create-tnpaList.dto';
import { CreateTnpaStrElemDTO } from './dto/create-tnpaStrElem.dto';

@Injectable()
export class TnpaService {
    constructor(@InjectRepository(STnpaList, 'mchs_connection') private tnpaListRepository: Repository<STnpaList>,
    @InjectRepository(STnpaStrElem, 'mchs_connection') private tnpaStrElemRepository: Repository<STnpaStrElem>){}

    async createTnpaList(dto: CreateTnpaListDTO): Promise<STnpaList>{
        const tnpa = this.tnpaListRepository.create(dto);
        return this.tnpaListRepository.save(tnpa);
    }

    async createTnpaStrElem(dto: CreateTnpaStrElemDTO): Promise<STnpaStrElem>{
        const tnpa = this.tnpaStrElemRepository.create(dto);
        return this.tnpaStrElemRepository.save(tnpa);
    }

    async getTnpaListById(idList: number):Promise<STnpaList>{
        const tnpa = await this.tnpaListRepository.findOneBy({idList});
        if(!tnpa){
            throw new TnpaListNotFoundException(idList);
        }
        return tnpa;
    }

    async getTnpaStrElemById(idElem: number):Promise<STnpaStrElem>{
        const tnpa = await this.tnpaStrElemRepository.findOneBy({idElem});
        if(!tnpa){
            throw new TnpaStrElemNotFoundException(idElem);
        }
        return tnpa;
    }

    async getAllTnpaLists():Promise<STnpaList[]>{
        const tnpas = await this.tnpaListRepository.find({where:{active:1}});
        return tnpas;
    }

    async getAllTnpaStrElems():Promise<STnpaStrElem[]>{
        const tnpas = await this.tnpaStrElemRepository.find({where:{active:1}});
        return tnpas;
    }

    async updateTnpaList(idList: number, dto: CreateTnpaListDTO){
        return await this.tnpaListRepository.update(idList, dto);
    }

    async updateTnpaStrElem(idElem: number, dto: CreateTnpaStrElemDTO){
        return await this.tnpaStrElemRepository.update(idElem, dto);
    }

    async deleteTnpaListById(idList: number){
        return await this.tnpaListRepository.update(idList, {active:0});
    }

    async deleteTnpaStrElemById(idElem: number){
        return await this.tnpaStrElemRepository.update(idElem, {active:0});
    }
}
