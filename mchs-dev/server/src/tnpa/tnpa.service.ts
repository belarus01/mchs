import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { STnpaList } from './entity/tnpaList.entity';
import { TnpaNotFoundException } from './exception/tnpa.not-found.exception';

@Injectable()
export class TnpaService {
    constructor(@InjectRepository(STnpaList, 'mchs_connection') private tnpaRepository: Repository<STnpaList>){}

    async getTnpaListById(idList: number):Promise<STnpaList>{
        const tnpa = this.tnpaRepository.findOneBy({idList});
        if(!tnpa){
            throw new TnpaNotFoundException(idList);
        }
        return tnpa;
    }

    async getAllTnpaLists():Promise<STnpaList[]>{
        const tnpas = this.tnpaRepository.find({where:{active:1}});
        return tnpas;
    }
}
