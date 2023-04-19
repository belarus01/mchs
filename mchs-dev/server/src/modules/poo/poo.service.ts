import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePooDTO } from './dto/create-poo.dto';
import { SPoo } from './entity/poo.entity';
import { Repository } from 'typeorm';
import { PooNotFoundException } from './exception/poo.not-found.exception';
import { CreatePooSubjPbDTO } from './dto/create-PooSubjPb.dto';
import { SPooSubjPb } from './entity/pooSubjPb.entity';
import { CreatePooDocsDTO } from './dto/create-PooDocs.dto';
import { SPooDocs } from './entity/pooDocs.entitty';

@Injectable()
export class PooService {
    constructor(
        @InjectRepository(SPoo, 'doc_connection') private pooRepository: Repository<SPoo>,
        @InjectRepository(SPooSubjPb, 'doc_connection') private pooSubjPbRepository: Repository<SPooSubjPb>,
        @InjectRepository(SPooDocs, 'doc_connection') private pooDocsRepository: Repository<SPooDocs>,
        ){}

    async createPoo(dto: CreatePooDTO){
        const poo = this.pooRepository.create(dto);
        return this.pooRepository.save(poo);
    }

    async getPooById(idPoo: number){
        const poo = await this.pooRepository.findOneBy({idPoo});
        if(!poo){
            throw new PooNotFoundException(`Poo id = ${idPoo} not found!`);
        }
        return poo;
    }

    async getAllPoos(){
        return await this.pooRepository.find();
    }
    
    async updatePoo(idPoo: number, dto: CreatePooDTO){
        return await this.pooRepository.update(idPoo, dto);
    }

    async deletePooById(idPoo: number){
        return await this.pooRepository.update(idPoo, {active:0});
    }

    async createPooSubjPb(dto: CreatePooSubjPbDTO){
        const pooSubjPb = this.pooSubjPbRepository.create(dto);
        return this.pooSubjPbRepository.save(pooSubjPb);
    }

    async getPooSubjPbById(idList: number){
        const pooSubjPb = await this.pooSubjPbRepository.findOneBy({idList});
        if(!pooSubjPb){
            throw new PooNotFoundException(`Poo Subj Pb id = ${idList} not found!`);
        }
        return pooSubjPb;
    }

    async getAllPooSubjPbs(){
        return await this.pooSubjPbRepository.find();
    }
    
    async updatePooSubjPb(idList: number, dto: CreatePooSubjPbDTO){
        return await this.pooSubjPbRepository.update(idList, dto);
    }

    async deletePooSubjPbById(idList: number){
        return await this.pooSubjPbRepository.update(idList, {active:0});
    }

    async createPooDoc(dto: CreatePooDocsDTO){
        const pooDocs = this.pooDocsRepository.create(dto);
        return this.pooDocsRepository.save(pooDocs);
    }

    async getPooDocById(idNumReg: number){
        const pooDocs = await this.pooDocsRepository.findOneBy({idNumReg});
        if(!pooDocs){
            throw new PooNotFoundException(`Poo Docs id = ${idNumReg} not found!`);
        }
        return pooDocs;
    }

    async getAllPooDocs(){
        return await this.pooDocsRepository.find();
    }
    
    async updatePooDoc(idNumReg: number, dto: CreatePooDocsDTO){
        return await this.pooDocsRepository.update(idNumReg, dto);
    }

    async deletePooDocById(idNumReg: number){
        return await this.pooDocsRepository.update(idNumReg, {active:0});
    }

}
