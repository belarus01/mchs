import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateJobTitleDTO } from './dto/create-jobTitle.dto';
import { DeleteJobTitleDTO } from './dto/delete-jobTitle.dto';
import { JobTitleService } from './jobTitle.service';

@Controller('job')
export class JobController {
    constructor(private jobTitleService: JobTitleService){}

    // @Get('/get/:idDeptJob')
    // async getJobTitleById(@Param('idDeptJob') idDeptJob: number){
    //     const jobTitle = await this.jobTitleService.getJobTitleById(idDeptJob);
    //     if(!jobTitle) throw new NotFoundException('Job title does not exist');
    //     return jobTitle;
    // }

    @Get('/get/id/:idDeptJob')
    async getJobTitleById(@Param('idDeptJob') idDeptJob: number){
        const jobTitle = await this.jobTitleService.getJobTitleById(idDeptJob);
        return jobTitle;
    }

    @Get('/get/all')
    async getAllJobTitles(){
        return this.jobTitleService.getAllJobTitles();
    }

    @Post('/create')
    async createJobTitle(@Body() jobTitleDto: CreateJobTitleDTO){
        return this.jobTitleService.createJobTitle(jobTitleDto);
    }

    @Put('/update')
    async updateJobTitle(@Param('idDeptJob') idDeptJob: number, @Body() jobTitleDto: CreateJobTitleDTO): Promise<Observable<any>>{
        return this.jobTitleService.updateJobTitle(Number(idDeptJob), jobTitleDto);
    }

    @Put('/delete')
    async deleteJobTitle(@Body() jobTitleDto: DeleteJobTitleDTO){
        return this.jobTitleService.deleteJobTitle(jobTitleDto);
    }
}
