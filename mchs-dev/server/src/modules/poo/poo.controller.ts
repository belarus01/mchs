import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePooDTO } from './dto/create-poo.dto';
import { PooService } from './poo.service';
import { CreatePooDocsDTO } from './dto/create-PooDocs.dto';
import { CreatePooSubjPbDTO } from './dto/create-PooSubjPb.dto';
import { Order } from 'src/utils/utils';

@Controller('poo')
export class PooController {
    constructor(private pooService: PooService){}

    @Post('/create')
    async createPoo(@Body() dto: CreatePooDTO){
        return this.pooService.createPoo(dto);
    }

    @Get('/get/id/:idPoo')
    async getPooById(@Param('idPoo') idPoo: number){
        return this.pooService.getPooById(idPoo);
    }

    @Get('/get/all')
    async getAllPoos(){
        return this.pooService.getAllPoos();
    }
    
    @Put('/update')
    async updatePoo(@Param('idPoo') idPoo: number, @Body() dto: CreatePooDTO){
        return this.pooService.updatePoo(idPoo, dto);
    }

    @Put('/delete/:idPoo')
    async deletePooById(@Param('idPoo') idPoo: number){
        return this.pooService.deletePooById(idPoo);
    }

    @Post('/create/pooDoc')
    async createPooDoc(@Body() dto: CreatePooDocsDTO){
        return this.pooService.createPooDoc(dto);
    }

    @Get('/get/pooDoc/id/:idNumReg')
    async getPooDocsById(@Param('idNumReg') idNumReg: number){
        return this.pooService.getPooDocById(idNumReg);
    }

    @Get('/get/all/pooDoc')
    async getAllPooDocs(){
        return this.pooService.getAllPooDocs();
    }
    
    @Put('/update/pooDoc')
    async updatePooDocs(@Param('idNumReg') idNumReg: number, @Body() dto: CreatePooDocsDTO){
        return this.pooService.updatePooDoc(idNumReg, dto);
    }

    @Put('/delete/pooDoc/:idNumReg')
    async deletePooDocsById(@Param('idNumReg') idNumReg: number){
        return this.pooService.deletePooDocById(idNumReg);
    }

    @Post('/create/pooSubjPb')
    async createPooSubjPb(@Body() dto: CreatePooSubjPbDTO){
        return this.pooService.createPooSubjPb(dto);
    }

    @Get('/get/pooSubjPb/id/:idList')
    async getPooSubjPbById(@Param('idList') idList: number){
        return this.pooService.getPooSubjPbById(idList);
    }

    @Get('/get/all/pooSubjPb')
    async getAllPooSubjPbs(){
        return this.pooService.getAllPooSubjPbs();
    }

    @Get('/get/all/pooSubjPb/idSubjObj/:idSubjObj')
    async getAllPooSubjPbsBySubjObjId(@Param('idSubjObj') idSubjObj: number){
        return this.pooService.getAllPooSubjPbsBySubjObjId(idSubjObj);
    }

    @Get('/get/all/pooSubjPb/relations/sorted')
    async getAllPooSubjPbsWithRelationsSortedBy(@Query() params: Order){
        const {field, order} = params;
        return this.pooService.getAllPooSubjPbsWithRelationsSortedBy(field, order);
    }
    
    @Put('/update/pooSubjPb')
    async updatePooSubjPb(@Param('idList') idList: number, @Body() dto: CreatePooSubjPbDTO){
        return this.pooService.updatePooSubjPb(idList, dto);
    }

    @Put('/delete/pooSubjPb/:idList')
    async deletePooSubjPbById(@Param('idList') idList: number){
        return this.pooService.deletePooSubjPbById(idList);
    }
}
