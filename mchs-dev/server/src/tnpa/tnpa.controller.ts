import { Controller, Get, Param } from '@nestjs/common';
import { TnpaService } from './tnpa.service';

@Controller('tnpa')
export class TnpaController {
    constructor(private tnpaService: TnpaService){}

    @Get('/get/id/:idList')
    async getTnpaById(@Param('idList') idList: number){
        const tnpa = this.tnpaService.getTnpaListById(idList);
        return tnpa;
    }

    @Get('/get/all')
    async getAllTnpaLists(){
        const tnpas = this.tnpaService.getAllTnpaLists();
        return tnpas;
    }
}
