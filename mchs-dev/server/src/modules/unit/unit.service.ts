import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitNotFoundException } from './exception/unit.not-found.exception';
import { SUnits } from './unit.entity';

@Injectable()
export class UnitService {
    constructor(@InjectRepository(SUnits, 'doc_connection') private unitRepository: Repository<SUnits>){}

    async getAllNamesByTypeUnit(typeUnit: number): Promise<SUnits[]>{
        const names = await this.unitRepository.find({where:{
            typeUnit: typeUnit, active:1
        }});
        if(names.length == 0){
            throw new UnitNotFoundException();
        }
        return names;
    }
}
