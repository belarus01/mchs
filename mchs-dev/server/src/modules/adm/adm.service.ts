import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SAdmBan } from './entity/admBan.entity';
import { SAdmForce } from './entity/admForce.entity';
import { CreateAdmBanDTO } from './dto/create-admBan.dto';
import { AdmBanNotFoundException } from './exception/admBan.not-found.exception';
import { CreateAdmForceDTO } from './dto/create-admForce.dto';
import { AdmForceNotFoundException } from './exception/admForce.not-found.exception';

@Injectable()
export class AdmService {
    constructor(@InjectRepository(SAdmBan, 'doc_connection') private admBanRepository: Repository<SAdmBan>,
    @InjectRepository(SAdmForce, 'doc_connection') private admForceRepository: Repository<SAdmForce>){}

    async createAdmBan(dto: CreateAdmBanDTO){
        const admBan = this.admBanRepository.create(dto);
        return this.admBanRepository.save(admBan);
    }

    async createAdmForce(dto: CreateAdmForceDTO){
        const admForce = this.admForceRepository.create(dto);
        return this.admForceRepository.save(admForce);
    }

    async getAdmBanById(idBan: number){
        const admBan = await this.admBanRepository.findOneBy({idBan});
        if(!admBan){
            throw new AdmBanNotFoundException(idBan);
        }
        return admBan;
    }

    async getAllAdmBans(){
        return await this.admBanRepository.find();
    }

    async getAdmForceById(idForce: number){
        const admForce = await this.admForceRepository.findOneBy({idForce});
        if(!admForce){
            throw new AdmForceNotFoundException(idForce);
        }
        return admForce;
    }

    async getAllAdmForces(){
        return await this.admForceRepository.find();
    }
    
    async updateAdmBan(idBan: number, dto: CreateAdmBanDTO){
        return await this.admBanRepository.update(idBan, dto);
    }

    async updateAdmForce(idForce: number, dto: CreateAdmForceDTO){
        return await this.admForceRepository.update(idForce, dto);
    }

    async deleteAdmBanById(idBan: number){
        return await this.admBanRepository.update(idBan, {active:2});
    }

    async deleteAdmForceById(idForce: number){
        return await this.admForceRepository.update(idForce, {active:2});
    }
}
