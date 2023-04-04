import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';

@Controller('subject')
export class SubjectController {
    constructor(private subjService: SubjectService){}

    @Post('/create')
    async createSubj(@Body() dto: CreateSubjectDTO){
        return this.subjService.createSubj(dto);
    }

    @Get('/get/all')
    getAllSubj(){
        return this.subjService.getAllSubj();
    }

    @Get('/get/id/:idSubj')
    async getSubjById(@Param('idSubj') idSubj: number){
        const subj = await this.subjService.getSubjById(idSubj);
        return subj;
    }

    @Put('/update')
    async updateSubj(@Param('idSubj') idSubj: number, @Body() dto: CreateSubjectDTO){
        return this.subjService.updateSubj(idSubj, dto);
    }

    @Put('/delete/:idSubj')
    async deleteSubjById(@Param('idSubj') idSubj: number){
        return this.subjService.deleteSubjById(idSubj);
    }
}
