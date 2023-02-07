import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectNotFoundException } from './exception/object.not-found.exception';
import { SSubjObj } from './object.entity';

@Injectable()
export class ObjectService {
    constructor(@InjectRepository(SSubjObj, 'mchs_connection') private objectRepository: Repository<SSubjObj>){

    }

    async getAllObjs(): Promise<SSubjObj[]>{
        const objects = await this.objectRepository.find({where: {
            active:1
        }});
        return objects;
    }

    async getObjById(idObj: number): Promise<SSubjObj>{
        const object = await this.objectRepository.findOneBy({idObj});
        if(!object){
            throw new ObjectNotFoundException(idObj);
        }
        return object;
    }

    async deleteObjById(idObj: number){
        const objToDelete = await this.getObjById(idObj);
        if(!objToDelete){
            throw new ObjectNotFoundException(idObj);
        }
        return objToDelete.active === 0;
    }
}
