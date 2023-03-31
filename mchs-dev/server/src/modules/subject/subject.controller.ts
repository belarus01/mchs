import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor( private subjService: SubjectService){

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

    @Put('/delete/:idSubj')
    async deleteSubjById(@Param('idSubj') idSubj: number){
        return this.subjService.deleteSubjById(idSubj);
    }
}
