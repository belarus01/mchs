import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SSubj } from './entity/subject.entity';
import { SubjectNotFoundException } from './exception/subject.not-found.exception';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { skipPage, sortByField } from 'src/utils/utils';

@Injectable()
export class SubjectService {
    constructor(@InjectRepository(SSubj, 'mchs_connection') private subjRepository: Repository<SSubj>){}

    async createSubj(dto: CreateSubjectDTO){
        const subj = this.subjRepository.create(dto);
        return this.subjRepository.save(subj);
    }

    async getSubjById(idSubj: number){
        const subj = await this.subjRepository.findOneBy({idSubj});
        if(!subj){
            throw new SubjectNotFoundException(idSubj);
        }
        return subj;
    }

    async getAllSubj(): Promise<SSubj[]>{
        const subj = this.subjRepository.find({where: {
            active:1
        }});
        return subj;
    }

    async getAllSubjSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const subjects = (await this.subjRepository.find({where:{active:1}}));
        const sorted = sortByField(subjects, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    }

    async updateSubj(idSubj: number, dto: CreateSubjectDTO){
        return await this.subjRepository.update(idSubj, dto);
    }

    async deleteSubjById(idSubj: number){
        const subjToDelete = await this.getSubjById(idSubj);
        if(!subjToDelete){
            throw new SubjectNotFoundException(idSubj);
        }
        return subjToDelete.active === 0; 
       // return this.subjRepository.update(idSubj, {active:0, }) // + uid
    }

    async getSubjectByUnp(unp:string){
        const subject = await this.subjRepository.findOne({where:{active:1, unp:unp}});
        console.log(subject);
        return subject;
    }
}
