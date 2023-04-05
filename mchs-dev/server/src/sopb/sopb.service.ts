import { Injectable } from '@nestjs/common';
import { SSopb } from './entity/sopb.entity';
import { Repository } from 'typeorm';
import { SSopbCard } from './entity/sopbCard.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSopbDTO } from './dto/create-sopb.dto';
import { CreateSopbCardDTO } from './dto/create-sopbCard.dto';
import { SopbNotFoundException } from './exception/sopb.not-found.exception';
import { SopbCardNotFoundException } from './exception/sopbCard.not-found.exception';

@Injectable()
export class SopbService {
    constructor(@InjectRepository(SSopb, 'doc_connection') private sopbRepository: Repository<SSopb>,
    @InjectRepository(SSopbCard, 'doc_connection') private sopbCardRepository: Repository<SSopbCard>){}

    async createSopb(dto: CreateSopbDTO): Promise<SSopb>{
        const sopb = this.sopbRepository.create(dto);
        return this.sopbRepository.save(sopb);
    }

    async createSopbCard(dto: CreateSopbCardDTO): Promise<SSopbCard>{
        const sopbCard = this.sopbCardRepository.create(dto);
        return this.sopbCardRepository.save(sopbCard);
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

    async getAllSopbs(): Promise<SSopb[]>{
        const sopbs = await this.sopbRepository.find();
        return sopbs;
    }

    async getAllSopbCards(): Promise<SSopbCard[]>{
        const sopbs = await this.sopbCardRepository.find();
        return sopbs;
    }

    async updateSopb(idSopb: number, dto: CreateSopbDTO){
        return await this.sopbRepository.update(idSopb, dto);
    }

    async updateSopbCard(idCard: number, dto: CreateSopbCardDTO){
        return await this.sopbCardRepository.update(idCard, dto);
    }

    async deleteSopbById(idSopb: number){
        return await this.sopbRepository.update(idSopb, {active: 0});
    }

    async deleteSopbCardById(idCard: number){
        return await this.sopbCardRepository.update(idCard,{active: 0});
    }
}
