import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectNotFoundException } from './exception/object.not-found.exception';
import { SSubjObj } from './entity/object.entity';
import { skipPage, sortByField } from 'src/utils/utils';
import { CreateObjectDTO } from './dto/create-object.dto';
import { SSubjObjSpecif } from './entity/objectSpecif.entity';
import { CreateObjectSpecifDTO } from './dto/create-objectSpecif.dto';

@Injectable()
export class ObjectService {
    constructor(
        @InjectRepository(SSubjObj, 'mchs_connection') private objectRepository: Repository<SSubjObj>,
        @InjectRepository(SSubjObjSpecif, 'mchs_connection') private objectSpecifRepository: Repository<SSubjObjSpecif>,
        ){}

    async createObject(dto: CreateObjectDTO){
        const obj = this.objectRepository.create(dto);
        return this.objectRepository.save(obj);
    }

    async createObjectSpecif(dto: CreateObjectSpecifDTO){
        const obj = this.objectRepository.create(dto);
        return this.objectRepository.save(obj);
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

    async getAllObjectSpecifsSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const objects = (await this.objectSpecifRepository.find({where:{active:1}}));
        const sorted = sortByField(objects, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    } 

    async getObjById(idObj: number): Promise<SSubjObj>{
        const object = await this.objectRepository.findOneBy({idObj});
        if(!object){
            throw new ObjectNotFoundException(`Object id = ${idObj} not found!`);
        }
        return object;
    }

    async getObjSpecifById(idSpecif: number): Promise<SSubjObjSpecif>{
        const objectSpecif = await this.objectSpecifRepository.findOneBy({idSpecif});
        if(!objectSpecif){
            throw new ObjectNotFoundException(`Object Specif id = ${idSpecif} not found!`);
        }
        return objectSpecif;
    }

    async getObjSpecifByObjectId(idObj:number){
        const result = await this.objectSpecifRepository.find({where:{idSubjObj:idObj}});
        return result;
    }

    async getObjectBySubjectId(idSubj:number){
        const objs = await this.objectRepository.find({where:{idSubj:idSubj}});
        return objs;
    }

    async updateObj(idObj: number, dto: CreateObjectDTO){
        return await this.objectRepository.update(idObj, dto);
    }

    async updateObjSpecif(idSpecif: number, dto: CreateObjectSpecifDTO){
        return await this.objectSpecifRepository.update(idSpecif, dto);
    }

    async deleteObjById(idObj: number){
        const objToDelete = await this.getObjById(idObj);
        if(!objToDelete){
            throw new ObjectNotFoundException(`Object id = ${idObj} not found!`);
        }
        return objToDelete.active === 0;
    }

    async deleteObjSpecifById(idSpecif: number){
        const objSpecifToDelete = await this.getObjSpecifById(idSpecif);
        if(!objSpecifToDelete){
            throw new ObjectNotFoundException(`Object id = ${idSpecif} not found!`);
        }
        return objSpecifToDelete.active === 0;
    }


}
