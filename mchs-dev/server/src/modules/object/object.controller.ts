import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ObjectService } from './object.service';
import { CreateObjectDTO } from './dto/create-object.dto';
import { Order, Pagination } from 'src/utils/utils';

@Controller('object')
export class ObjectController {
    constructor(private objectService: ObjectService){}

    @Post('/create')
    async createObject(@Body() dto: CreateObjectDTO){
        return this.objectService.createObject(dto);
    }

    @Get('/get/all')
    getAllObjs(){
        return this.objectService.getAllObjs;
    }

    @Get('get/all/sorted/by/page')
    async getAllObjectsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.objectService.getAllObjectsSortAndPage(field, order, current, pageSize, total);
    }

    @Get('/get/id/:idObj')
    getObjById(@Param('idObj') idObj: number){
        const object = this.objectService.getObjById(idObj);
        return object;
    }

    @Get('/get/subjectId=:idSubj')
    getAllObjectsBySubjectId(@Param('idSubj') idSubj:number){
        return this.objectService.getObjectBySubjectId(idSubj);
    }

    @Put('/update')
    async updateObj(@Param('idObj') idObj: number, @Body() dto: CreateObjectDTO){
        return this.objectService.updateObj(idObj, dto);
    }


    @Put('/delete/:idObj')
    deleteObjById(@Param('idObj') idObj: number){
        return this.objectService.deleteObjById(idObj);
    } 
}
