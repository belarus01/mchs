import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SPogSubjAccidents } from './entity/pogSubjAccident.entity';
import { Repository } from 'typeorm';
import { SPogSubjAvia } from './entity/pogSubjAvia.entity';
import { SPogSubjAuto } from './entity/pogSubjAuto.entity';
import { SPogSubjRw } from './entity/pogSubjRw.entity';
import { SPogSubjWater } from './entity/pogSubjWater.entity';
import { CreatePogSubjAccidentDTO } from './dto/create-pogSubjAccident.dto';
import { PogNotFoundException } from './exception/pog.not-found.exception';
import { CreatePogSubjAviaDTO } from './dto/create-pogSubjAvia.dto';
import { CreatePogSubjAutoDTO } from './dto/create-pogSubjAuto.dto';
import { CreatePogSubjRwDTO } from './dto/create-pogSubjRw.dto';
import { CreatePogSubjWaterDTO } from './dto/create-pogSubjWater.dto';
import { skipPage, sortByField } from 'src/utils/utils';

@Injectable()
export class PogService {
    constructor(
    @InjectRepository(SPogSubjAccidents, 'mchs_connection') private pogSubjAccidentRepository: Repository<SPogSubjAccidents>,
    @InjectRepository(SPogSubjAvia, 'mchs_connection') private pogSubjAviaRepository: Repository<SPogSubjAvia>,
    @InjectRepository(SPogSubjAuto, 'mchs_connection') private pogSubjAutoRepository: Repository<SPogSubjAuto>,
    @InjectRepository(SPogSubjRw, 'mchs_connection') private pogSubjRwRepository: Repository<SPogSubjRw>,
    @InjectRepository(SPogSubjWater, 'mchs_connection') private pogSubjWaterRepository: Repository<SPogSubjWater>,
    ){}

    async createPogSubjAccident(dto: CreatePogSubjAccidentDTO){
        const pogSubjAccident = this.pogSubjAccidentRepository.create(dto);
        return this.pogSubjAccidentRepository.save(pogSubjAccident);
    }

    async getPogSubjAccidentById(idList: number){
        const pogSubjAccident = await this.pogSubjAccidentRepository.findOneBy({idList});
        if(!pogSubjAccident){
            throw new PogNotFoundException(`Pog Subj Accident id = ${idList} not found!`);
        }
        return pogSubjAccident;
    }

    async getAllPogSubjAccidents(){
        return await this.pogSubjAccidentRepository.find({where:{active:1}});
    }

    async updatePogSubjAccident(idList: number, dto: CreatePogSubjAccidentDTO){
        return await this.pogSubjAccidentRepository.update(idList, dto);
    }

    async deletePogSubjAccidentById(idList: number){
        return await this.pogSubjAccidentRepository.update(idList, {active:0});
    }


    async createPogSubjAvia(dto: CreatePogSubjAviaDTO){
        const pogSubjAvia = this.pogSubjAviaRepository.create(dto);
        return this.pogSubjAviaRepository.save(pogSubjAvia);
    }

    async getPogSubjAviaById(idList: number){
        const pogSubjAvia = await this.pogSubjAviaRepository.findOneBy({idList});
        if(!pogSubjAvia){
            throw new PogNotFoundException(`Pog Subj Avia id = ${idList} not found!`);
        }
        return pogSubjAvia;
    }

    async getAllPogSubjAvias(){
        return await this.pogSubjAviaRepository.find({where:{active:1}});
    }

    async getAllPogSubjAviasBySubjObjId(idSubjObj: number){
        return await this.pogSubjAviaRepository.find({
            where:{
                active:1,
                idSubjObj: idSubjObj
            }
        });
    }

    async updatePogSubjAvia(idList: number, dto: CreatePogSubjAviaDTO){
        return await this.pogSubjAviaRepository.update(idList, dto);
    }

    async deletePogSubjAviaById(idList: number){
        return await this.pogSubjAviaRepository.update(idList, {active:0});
    }

    
    async createPogSubjAuto(dto: CreatePogSubjAutoDTO){
        const pogSubjAuto = this.pogSubjAutoRepository.create(dto);
        return this.pogSubjAutoRepository.save(pogSubjAuto);
    }

    async getPogSubjAutoById(idList: number){
        const pogSubjAuto = await this.pogSubjAutoRepository.findOneBy({idList});
        if(!pogSubjAuto){
            throw new PogNotFoundException(`Pog Subj Auto id = ${idList} not found!`);
        }
        return pogSubjAuto;
    }

    async getAllPogSubjAutos(){
        return await this.pogSubjAutoRepository.find({where:{active:1}});
    }

    async getAllPogSubjAutosBySubjObjId(idSubjObj: number){
        return await this.pogSubjAutoRepository.find({
            where:{
                active:1,
                idSubjObj: idSubjObj
            }
        });
    }

    async getAllPogSubjAutosWithRelationsSortAndPage(
        field:string,
        order:string,
        current: string,
        pageSize: string,
        total: number
        ) {
        const autos = (await this.pogSubjAutoRepository.find({
            where:{
            active: 1
        }, 
        relations: {
           idOblSubj2: true,
           idSubj2: true,
           idSubjObj2: true 
        }
    }));
    const sorted = sortByField(autos, field, order);
    const paged = skipPage(sorted, current, pageSize, total);
    return paged;
    }
    
    async updatePogSubjAuto(idList: number, dto: CreatePogSubjAutoDTO){
        return await this.pogSubjAutoRepository.update(idList, dto);
    }

    async deletePogSubjAutoById(idList: number){
        return await this.pogSubjAutoRepository.update(idList, {active:0});
    }

    
    async createPogSubjRw(dto: CreatePogSubjRwDTO){
        const pogSubjRw = this.pogSubjRwRepository.create(dto);
        return this.pogSubjRwRepository.save(pogSubjRw);
    }

    async getPogSubjRwById(idList: number){
        const pogSubjRw = await this.pogSubjRwRepository.findOneBy({idList});
        if(!pogSubjRw){
            throw new PogNotFoundException(`Pog Subj Rw id = ${idList} not found!`);
        }
        return pogSubjRw;
    }

    async getAllPogSubjRws(){
        return await this.pogSubjRwRepository.find({where:{active:1}});
    }

    async getAllPogSubjRwsBySubjObjId(idSubjObj: number){
        return await this.pogSubjRwRepository.find({
            where:{
                active:1,
                idSubjObj: idSubjObj
            }
        });
    }
    
    async updatePogSubjRw(idList: number, dto: CreatePogSubjRwDTO){
        return await this.pogSubjRwRepository.update(idList, dto);
    }

    async deletePogSubjRwById(idList: number){
        return await this.pogSubjRwRepository.update(idList, {active:0});
    }


    async createPogSubjWater(dto: CreatePogSubjWaterDTO){
        const pogSubjWater = this.pogSubjWaterRepository.create(dto);
        return this.pogSubjWaterRepository.save(pogSubjWater);
    }

    async getPogSubjWaterById(idList: number){
        const pogSubjWater = await this.pogSubjWaterRepository.findOneBy({idList});
        if(!pogSubjWater){
            throw new PogNotFoundException(`Pog Subj Water id = ${idList} not found!`);
        }
        return pogSubjWater;
    }

    async getAllPogSubjWaters(){
        return await this.pogSubjWaterRepository.find({where:{active:1}});
    }

    async getAllPogSubjWatersBySubjObjId(idSubjObj: number){
        return await this.pogSubjWaterRepository.find({
            where:{
                active:1,
                idSubjObj: idSubjObj
            }
        });
    }
    
    async updatePogSubjWater(idList: number, dto: CreatePogSubjWaterDTO){
        return await this.pogSubjWaterRepository.update(idList, dto);
    }

    async deletePogSubjWaterById(idList: number){
        return await this.pogSubjWaterRepository.update(idList, {active:0});
    }

}
