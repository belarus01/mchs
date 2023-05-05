import { Injectable } from '@nestjs/common';
import { SSopb } from './entity/sopb.entity';
import { Repository } from 'typeorm';
import { SSopbCard } from './entity/sopbCard.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSopbDTO } from './dto/create-sopb.dto';
import { CreateSopbCardDTO } from './dto/create-sopbCard.dto';
import { SopbNotFoundException } from './exception/sopb.not-found.exception';
import { SopbCardNotFoundException } from './exception/sopbCard.not-found.exception';
import { CreateSopbCardSubjDTO } from './dto/create-sopbCardSubj.dto';
import { SSopbCardSubj } from './entity/sopbCardSubj.entity';
import { SopbCardSubjNotFoundException } from './exception/sopbCardSubj.not-found.exception';
import { skipPage, sortByField } from 'src/utils/utils';
import { SSopbCardSubjState } from './entity/sopbCardSubjState.entity';
import { SopbCardSubjStateNotFoundException } from './exception/sopbCardSubjState.exception';
import { SSopbCardSubjList } from './entity/sopbCardSubjList.entity';
import { SopbCardSubjListNotFoundException } from './exception/sopbCardSubjList.not-found.exception';

@Injectable()
export class SopbService {
    constructor(@InjectRepository(SSopb, 'mchs_connection') private sopbRepository: Repository<SSopb>,
    @InjectRepository(SSopbCard, 'mchs_connection') private sopbCardRepository: Repository<SSopbCard>,
    @InjectRepository(SSopbCardSubj, 'mchs_connection') private sopbCardSubjRepository: Repository<SSopbCardSubj>,
    @InjectRepository(SSopbCardSubjState, 'mchs_connection') private sopbCardSubjStateRepository: Repository<SSopbCardSubjState>,
    @InjectRepository(SSopbCardSubjList, 'mchs_connection') private sopbCardSubjListRepository: Repository<SSopbCardSubjList>,
    ){}

    async createSopb(dto: CreateSopbDTO): Promise<SSopb>{
        const sopb = this.sopbRepository.create(dto);
        return this.sopbRepository.save(sopb);
    }

    async createSopbCard(dto: CreateSopbCardDTO): Promise<SSopbCard>{
        const sopbCard = this.sopbCardRepository.create(dto);
        return this.sopbCardRepository.save(sopbCard);
    }

    async createSopbCardSubj(dto: CreateSopbCardSubjDTO): Promise<SSopbCardSubj>{
        const sopbCard = this.sopbCardSubjRepository.create(dto);
        return this.sopbCardSubjRepository.save(sopbCard);
    }

    async getSopbById(idSopb: number): Promise<SSopb>{
        const sopb = await this.sopbRepository.findOneBy({idSopb});
        if(!sopb){
            throw new SopbNotFoundException(idSopb);
        }
        return sopb;
    }

    async getSopbCardById(idCard: number): Promise<SSopbCard>{
        const sopbCard = await this.sopbCardRepository.findOneBy({idCard});
        if(!sopbCard){
            throw new SopbCardNotFoundException(idCard);
        }
        return sopbCard;
    }

    async getSopbCardsBySopbId(idSopb: number): Promise<SSopbCard[]> {
        const sopbCards = await this.sopbCardRepository.find({
          where: { idSopb: idSopb },
        });
        if (!sopbCards) {
          throw new SopbCardNotFoundException(idSopb);
        }
        return sopbCards;
      }
    
    async getSopbCardSubjById(idData: number): Promise<SSopbCardSubj>{
        const sopbCardSubj = await this.sopbCardSubjRepository.findOneBy({idData});
        if(!sopbCardSubj){
            throw new SopbCardSubjNotFoundException(idData);
        }
        return sopbCardSubj;
    }

    async getSopbCardSubjStateById(idDataState: number): Promise<SSopbCardSubjState>{
        const sopbCardSubjState = await this.sopbCardSubjStateRepository.findOneBy({idDataState});
        if(!sopbCardSubjState){
            throw new SopbCardSubjStateNotFoundException(idDataState);
        }
        return sopbCardSubjState;
    }

    async getSopbCardSubjListById(idList: number){
        const sopbCardSubjList = await this.sopbCardSubjListRepository.findOneBy({idList});
        if(!sopbCardSubjList){
            throw new SopbCardSubjListNotFoundException(idList);
        }
        return sopbCardSubjList;
    }

    async getAllSopbs(): Promise<SSopb[]>{
        const sopbs = await this.sopbRepository.find({where:{active:1}});
        return sopbs;
    }// + withRelations

    async getAllSopbCards(): Promise<SSopbCard[]>{
        const sopbs = await this.sopbCardRepository.find({where:{active:1}});
        return sopbs;
    }

    async getAllSopbCardsWithRelations(): Promise<SSopbCard[]>{
        const sopbs = await this.sopbCardRepository.find({where:{
            active: 1   
           }, relations: {
            idDeptRequest2: true,
            idSopb2: true,
            u: true,
            sSopbCardSubjLists: true,
            sSopbCardUs: true,
           }});
        return sopbs;
    }

    async getAllSopbCardSubjsSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const objects = (await this.sopbCardSubjRepository.find({where:{active:1}}));
        const sorted = sortByField(objects, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    }

    async getAllSopbCardSubjs(){
        return await this.sopbCardSubjRepository.find({where:{active:1}});
    }

    async getAllSopbCardSubjsBySubjObjId(idSubjObj: number){
        return await this.sopbCardSubjRepository.find({
            where:{
                active:1,
                idSubjObj: idSubjObj
            }
        });
    }
    
    async getAllSopbCardSubjStates(): Promise<SSopbCardSubjState[]>{
        const sopbs = await this.sopbCardSubjStateRepository.find({where:{active:1}});
        return sopbs;
    }

    async getAllSopbCardSubjStatesWithRelations(){
        const sopbs = (await this.sopbCardSubjStateRepository.find({where:{
         active: 1   
        }, relations: {
            idData2: true,
            idState2: true
        }}));
        return sopbs;
    }

    async getAllSopbCardSubjLists(){
        return await this.sopbCardSubjListRepository.find({where:{active:1}});
    }

    async getAllSopbCardSubjListsBySopbCardSubjId(idSubjSopb: number){
        return await this.sopbCardSubjListRepository.find({
            where:{
                active:1,
                idSubjSopb: idSubjSopb
            }
        });
    }

    async updateSopb(idSopb: number, dto: CreateSopbDTO){
        return await this.sopbRepository.update(idSopb, dto);
    }

    async updateSopbCard(idCard: number, dto: CreateSopbCardDTO){
        return await this.sopbCardRepository.update(idCard, dto);
    }

    async updateSopbCardSubj(idData: number, dto: CreateSopbCardSubjDTO){
        return await this.sopbCardSubjRepository.update(idData, dto);
    }

    async deleteSopbById(idSopb: number){
        return await this.sopbRepository.update(idSopb, {active: 0});
    }

    async deleteSopbCardById(idCard: number){
        return await this.sopbCardRepository.update(idCard,{active: 0});
    }

    async deleteSopbCardSubjById(idData: number){
        return await this.sopbCardSubjRepository.update(idData,{active: 2});
    }
}
