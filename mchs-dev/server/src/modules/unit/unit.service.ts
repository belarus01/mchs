import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitNotFoundException } from './exception/unit.not-found.exception';
import { SUnits } from './unit.entity';
import { CreateUnitDTO } from './dto/create-unit.dto';

@Injectable()
export class UnitService {
    constructor(@InjectRepository(SUnits, 'mchs_connection') private unitRepository: Repository<SUnits>){}

    async createUnit(dto: CreateUnitDTO): Promise<SUnits>{
        const unit = this.unitRepository.create(dto);
        return this.unitRepository.save(unit);
    }

    async getUnitById(idUnit: number): Promise<SUnits>{
        const unit = await this.unitRepository.findOneBy({idUnit});
        if(!unit){
            throw new UnitNotFoundException();
        }
        return unit;
    }

    async getAllUnits(): Promise<SUnits[]>{
        const units = await this.unitRepository.find();
        return units;
    }

    async getAllNamesByTypeUnit(typeUnit: number): Promise<SUnits[]>{
        const names = await this.unitRepository.find({where:{
            typeUnit: typeUnit, active:1
        }});
        if(names.length == 0){
            throw new UnitNotFoundException();
        }
        return names;
    }

    async updateUnit(idUnit: number, dto: CreateUnitDTO){
        return await this.unitRepository.update(idUnit, dto);
    }

    async deleteUnitById(idUnit: number){
        const unit = await this.unitRepository.update(idUnit, {active:0});
        return unit;
    }
}
