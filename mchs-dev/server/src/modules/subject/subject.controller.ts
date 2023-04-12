import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { Order, Pagination } from 'src/utils/utils';

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

    @Get('get/all/sorted/by/page')
    async getAllSubjSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.subjService.getAllSubjSortAndPage(field, order, current, pageSize, total);
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
