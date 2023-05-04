import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SFireCardBuild } from './entity/fireCardBuild.entity';
import { Repository } from 'typeorm';
import { CreateFireCardBuildDTO } from './dto/create-fireCardBuild.dto';
import { FireCardNotFoundException } from './exception/fireCard.not-found.exception';

@Injectable()
export class FireService {
    constructor(
        @InjectRepository(SFireCardBuild, 'mchs_connection')
        private fireCardBuildRepository: Repository<SFireCardBuild>,
    ){}

    async createFireCardBuild(dto: CreateFireCardBuildDTO){
        const fireCard = this.fireCardBuildRepository.create(dto);
        return this.fireCardBuildRepository.save(fireCard);
    }

    async getFireCardBuildById(idList: number){
        const fireCard = this.fireCardBuildRepository.findOneBy({idList});
        if(!fireCard){
            throw new FireCardNotFoundException(idList);
        }
        return fireCard;
    }

    async getAllFireCardBuilds(){
        return await this.fireCardBuildRepository.find({where:{active:1}});
    }

    async getAllFireCardBuilsWithRelations(){
        return await this.fireCardBuildRepository.find({
            where:{
            active:1
        },  relations:{
            idCard2: true,
            idSubjObj2: true,
            idUnit_17: true,
            idUnit: true,
            idUnit_2: true
        }
        });
    }

    async getAllFireCardBuildsBySubjObjId(idSubjObj: number){
        return await this.fireCardBuildRepository.find({
            where:{
                active:1,
                idSubjObj: idSubjObj
            }
        });
    }


    async updateFireCardBuild(idList: number, dto: CreateFireCardBuildDTO){
        return await this.fireCardBuildRepository.update(idList, dto);
    }

    async deleteFireCardBuildById(idList: number){
        return await this.fireCardBuildRepository.update(idList, {active: 0});
    }

}
