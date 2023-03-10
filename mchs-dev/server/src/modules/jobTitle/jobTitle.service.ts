import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateJobTitleDTO } from './dto/create-jobTitle.dto';
import { DeleteJobTitleDTO } from './dto/delete-jobTitle.dto';
import { JobTitleBadRequestException } from './exception/job-title.bad-request.exception';
import { JobTitleNotFoundException } from './exception/jobTitle.not-found.exception';
import { SDeptJob } from './jobTitle.entity';

@Injectable()
export class JobTitleService {
    constructor(@InjectRepository(SDeptJob, 'mchs_connection') private jobTitleRepository: Repository<SDeptJob>){}

    async getJobTitleById(idDeptJob: number): Promise<SDeptJob>{
        const jobTitle = await this.jobTitleRepository.findOneBy({idDeptJob});
        if(!jobTitle){
            throw new JobTitleNotFoundException(idDeptJob);
        }
        return jobTitle;
    }

    async getAllJobTitles(): Promise<SDeptJob[]>{
        const jobTitles = await this.jobTitleRepository.find({where:{active: 1}});// а нужен ли статус активен/удален у должностей?
        return jobTitles;
    }

/*     async createJobTitle(jobTitleDto: CreateJobTitleDTO): Promise<SDeptJob>{
        const jobTitle = this.jobTitleRepository.create(jobTitleDto);
        if(jobTitle.job){
            throw new JobTitleBadRequestException(`Дожность ${jobTitle.job} уже существует`);
        }
        return this.jobTitleRepository.save(jobTitle);
    } */

    async createJobTitle(jobTitleDto: CreateJobTitleDTO): Promise<SDeptJob>{
        const jobTitle = this.jobTitleRepository.create(jobTitleDto);
        try{
            return this.jobTitleRepository.save(jobTitle);
        }catch(error){
            console.log(error);
        }
    }

    async updateJobTitle(idDeptJob: number, jobTtitleDto:CreateJobTitleDTO){
        
        return from(this.jobTitleRepository.update(idDeptJob,jobTtitleDto)).pipe(
            switchMap(()=> this.getJobTitleById(idDeptJob))
        );
    }

    async deleteJobTitle(jobTitleDto: DeleteJobTitleDTO){
        return this.jobTitleRepository.update(jobTitleDto.idDeptJob, {active: 0, dateRecord: new Date(Date.now()), uid: jobTitleDto.uid});
    }
}
