import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STypeTest } from './entity/typeTest.entity';
import { Repository } from 'typeorm';
import { CreateTypeTestDTO } from './dto/create-typeTest.dto';
import { TypeTestNotFoundException } from './exception/typeTest.not-found.exception';

@Injectable()
export class TypeService {
    constructor(@InjectRepository(STypeTest, 'doc_connection') private typeTestRepository: Repository<STypeTest>){}

    async createTypeTest(dto: CreateTypeTestDTO){
        const typeTest = this.typeTestRepository.create(dto);
        return this.typeTestRepository.save(typeTest);
    }

    async getTypeTestById(idTypeTest: number){
        const typeTest = await this.typeTestRepository.findOneBy({idTypeTest});
        if(!typeTest){
            throw new TypeTestNotFoundException(idTypeTest);
        }
        return typeTest;
    }

    async getAllTypeTests(){
        return await this.typeTestRepository.find();
    }
    
    async updateTypeTest(idTypeTest: number, dto: CreateTypeTestDTO){
        return await this.typeTestRepository.update(idTypeTest, dto);
    }

    async deleteTypeTestById(idTypeTest: number){
        return await this.typeTestRepository.update(idTypeTest, {active:0});
    }

}
