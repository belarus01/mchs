import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SOked_2 } from './entity/oked.entity';
import { OkedDateNotFoundException } from './exception/oked.date.not-found.exception';
import { OkedNotFoundException } from './exception/oked.not-found.exception';

@Injectable()
export class OkedService {
    constructor(@InjectRepository(SOked_2, 'mchs_connection') private okedRepository: Repository<SOked_2>){}

    async getOkedDateBegin(idOked: number){
        const okedDateBegin = (await this.okedRepository.findOneBy({idOked})).dateBegin;
        if(!okedDateBegin){
            throw new OkedDateNotFoundException(idOked);
        }
        return okedDateBegin;
    }

    async getOkedDateEnd(idOked: number){
        const okedDateEnd = (await this.okedRepository.findOneBy({idOked})).dateEnd;
        if(!okedDateEnd){
            throw new OkedDateNotFoundException(idOked);
        }
        return okedDateEnd;
    }

    async getOkedById(idOked: number): Promise<SOked_2>{
        const oked = this.okedRepository.findOneBy({idOked});
        if(!oked){
            throw new OkedNotFoundException(idOked);
        }
        return oked;
    }

    async getAllOked(): Promise<SOked_2[]>{
        const okeds = this.okedRepository.find({
            where: {active: 1}
        });
        return okeds;
    }

}
