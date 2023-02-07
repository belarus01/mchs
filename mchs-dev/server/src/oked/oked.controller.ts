import { Controller, Get, Param } from '@nestjs/common';
import { OkedService } from './oked.service';

@Controller('oked')
export class OkedController {
    constructor(private okedService: OkedService){}

    @Get('/get/id/:idOked')
    async getOkedById(@Param('idOked') idOked: number){
        const oked  = this.okedService.getOkedById(idOked);
        return oked;
    }

    @Get('/get/all')
    async getAllOked(){
        const okeds = this.okedService.getAllOked();
        return okeds;
    }

    @Get('/get/dateBegin/id/:idOked')
    async getOkedDateBegin(@Param('idOked') idOked: number){
        const oked = this.okedService.getOkedDateBegin(idOked);
        return oked;
    }

    @Get('/get/dateEnd/id/:idOked')
    async getOkedDateEnd(@Param('idOked') idOked: number){
        const oked = this.okedService.getOkedDateEnd(idOked);
        return oked;
    }
}
