import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TnpaService } from './tnpa.service';
import { CreateTnpaListDTO } from './dto/create-tnpaList.dto';
import { CreateTnpaStrElemDTO } from './dto/create-tnpaStrElem.dto';

@Controller('tnpa')
export class TnpaController {
    constructor(private tnpaService: TnpaService){}

    @Post('/crate/tnpaList')
    async createTnpaList(@Body() dto: CreateTnpaListDTO){
        return this.tnpaService.createTnpaList(dto);
    }

    @Post('/create/tnpaStrElem')
    async createTnpaStrElem(@Body() dto: CreateTnpaStrElemDTO){
        return this.tnpaService.createTnpaStrElem(dto);
    }

    @Get('/get/id/tnpaList/:idList')
    async getTnpaListById(@Param('idList') idList: number){
        const tnpa = this.tnpaService.getTnpaListById(idList);
        return tnpa;
    }

    @Get('/get/id/tnpaStrElem/:idList')
    async getTnpaStrElemById(@Param('idElem') idElem: number){
        const tnpa = this.tnpaService.getTnpaStrElemById(idElem);
        return tnpa;
    }

    @Get('/get/all/tnpaLists')
    async getAllTnpaLists(){
        const tnpas = this.tnpaService.getAllTnpaLists();
        return tnpas;
    }

    @Get('/get/all/tnpaStrElems')
    async getAllTnpaStrElems(){
        const tnpas = this.tnpaService.getAllTnpaStrElems();
        return tnpas;
    }

    @Put('/update/tnpaList')
    async updateTnpaList(@Param('idList') idList: number, @Body() dto: CreateTnpaListDTO){
        return this.tnpaService.updateTnpaList(idList, dto);
    }

    @Put('/update/tnpaStrElem')
    async updateTnpaStrElem(@Param('idElem') idElem: number, @Body() dto: CreateTnpaStrElemDTO){
        return this.tnpaService.updateTnpaStrElem(idElem, dto);
    }

    @Put('/delete/tnpaList')
    async deleteTnpaListById(@Param('idList') idList: number){
        return this.tnpaService.deleteTnpaListById(idList);
    }

    @Put('/delete/tnpaStrElem')
    async deleteTnpaStrElemById(@Param('idElem') idElem: number){
        return this.tnpaService.deleteTnpaStrElemById(idElem);
    }
}
