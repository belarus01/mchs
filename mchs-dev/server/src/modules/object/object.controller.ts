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
        if(!object) throw new NotFoundException('Object does not exists');
        return object;
    }

    @Put('/delete/:idObj')
    deleteObjById(@Param('idObj') idObj: number){
        return this.objectService.deleteObjById(idObj);
    }
}
