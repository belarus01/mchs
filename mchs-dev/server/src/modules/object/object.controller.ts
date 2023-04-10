import { Controller, Delete, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { ObjectService } from './object.service';

@Controller('object')
export class ObjectController {
    constructor(private objectService: ObjectService){

    }

    @Get('/get/all')
    getAllObjs(){
        return this.objectService.getAllObjs;
    }

    @Get('/get/id/:idObj')
    getObjById(@Param('idObj') idObj: number){
        const object = this.objectService.getObjById(idObj);
        return object;
    }

    @Put('/delete/:idObj')
    deleteObjById(@Param('idObj') idObj: number){
        return this.objectService.deleteObjById(idObj);
    }

    @Get('/get/subjectId=:idSubj')
    getAllObjectsBySubjectId(@Param('idSubj') idSubj:number){
        return this.objectService.getObjectBySubjectId(idSubj);
    }
}
