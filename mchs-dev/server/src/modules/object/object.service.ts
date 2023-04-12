import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectNotFoundException } from './exception/object.not-found.exception';
import { SSubjObj } from './object.entity';
import { skipPage, sortByField } from 'src/utils/utils';
import { CreateObjectDTO } from './dto/create-object.dto';

@Injectable()
export class ObjectService {
    constructor(@InjectRepository(SSubjObj, 'mchs_connection') private objectRepository: Repository<SSubjObj>){}

    async createObject(dto: CreateObjectDTO){
        const subj = this.objectRepository.create(dto);
        return this.objectRepository.save(subj);
    }


    async getAllObjs(): Promise<SSubjObj[]>{
        const objects = await this.objectRepository.find({where: {
            active:1
        }});
        return objects;
    }

     async getAllObjectsSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const objects = (await this.objectRepository.find({where:{active:1}}));
        const sorted = sortByField(objects, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    } 

    async getObjById(idObj: number): Promise<SSubjObj>{
        const object = await this.objectRepository.findOneBy({idObj});
        if(!object){
            throw new ObjectNotFoundException(idObj);
        }
        return object;
    }

    async getObjectBySubjectId(idSubj:number){
        const objs = await this.objectRepository.find({where:{idSubj:idSubj}});
        return objs;
    }

    async updateObj(idObj: number, dto: CreateObjectDTO){
        return await this.objectRepository.update(idObj, dto);
    }

    async deleteObjById(idObj: number){
        const objToDelete = await this.getObjById(idObj);
        if(!objToDelete){
            throw new ObjectNotFoundException(idObj);
        }
        return objToDelete.active === 0;
    }
}
