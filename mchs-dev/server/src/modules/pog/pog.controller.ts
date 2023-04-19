import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PogService } from './pog.service';
import { CreatePogSubjAccidentDTO } from './dto/create-pogSubjAccident.dto';
import { CreatePogSubjAviaDTO } from './dto/create-pogSubjAvia.dto';
import { CreatePogSubjRwDTO } from './dto/create-pogSubjRw.dto';
import { CreatePogSubjAutoDTO } from './dto/create-pogSubjAuto.dto';
import { CreatePogSubjWaterDTO } from './dto/create-pogSubjWater.dto';

@Controller('pog')
export class PogController {
    constructor(private pogService: PogService){}

    @Post('/create/pogSubjAccident')
    async createPogSubjAccident(@Body() dto: CreatePogSubjAccidentDTO){
        return this.pogService.createPogSubjAccident(dto);
    }

    @Get('/get/pogSubjAccident/id/:idList')
    async getPogSubjAccidentById(@Param('idList') idList: number){
        return this.pogService.getPogSubjAccidentById(idList);
    }

    @Get('/get/all/pogSubjAccidents')
    async getAllPogSubjAccidents(){
        return this.pogService.getAllPogSubjAccidents();
    }
    
    @Put('/update/pogSubjAccident')
    async updatePogSubjAccident(@Param('idList') idList: number, @Body() dto: CreatePogSubjAccidentDTO){
        return this.pogService.updatePogSubjAccident(idList, dto);
    }

    @Put('/delete/pogSubjAccident/:idList')
    async deletePogSubjAccidentById(@Param('idList') idList: number){
        return this.pogService.deletePogSubjAccidentById(idList);
    }

    @Post('/create/pogSubjAvia')
    async createPogSubjAvia(@Body() dto: CreatePogSubjAviaDTO){
        return this.pogService.createPogSubjAvia(dto);
    }

    @Get('/get/pogSubjAvia/id/:idList')
    async getPogSubjAviaById(@Param('idList') idList: number){
        return this.pogService.getPogSubjAviaById(idList);
    }

    @Get('/get/all/pogSubjAvias')
    async getAllPogSubjAvias(){
        return this.pogService.getAllPogSubjAvias();
    }
    
    @Put('/update/pogSubjAvia')
    async updatePogSubjAvia(@Param('idList') idList: number, @Body() dto: CreatePogSubjAviaDTO){
        return this.pogService.updatePogSubjAvia(idList, dto);
    }

    @Put('/delete/pogSubjAvia/:idList')
    async deletePogSubjAviaById(@Param('idList') idList: number){
        return this.pogService.deletePogSubjAviaById(idList);
    }

    @Post('/create/pogSubjRw')
    async createPogSubjRw(@Body() dto: CreatePogSubjRwDTO){
        return this.pogService.createPogSubjRw(dto);
    }

    @Get('/get/pogSubjRw/id/:idList')
    async getPogSubjRwById(@Param('idList') idList: number){
        return this.pogService.getPogSubjRwById(idList);
    }

    @Get('/get/all/pogSubjRw')
    async getAllPogSubjRws(){
        return this.pogService.getAllPogSubjRws();
    }
    
    @Put('/update/pogSubjRw')
    async updatePogSubjRw(@Param('idList') idList: number, @Body() dto: CreatePogSubjRwDTO){
        return this.pogService.updatePogSubjRw(idList, dto);
    }

    @Put('/delete/pogSubjRw/:idList')
    async deletePogSubjRwById(@Param('idList') idList: number){
        return this.pogService.deletePogSubjRwById(idList);
    }


    @Post('/create/pogSubjAuto')
    async createPogSubjAuto(@Body() dto: CreatePogSubjAutoDTO){
        return this.pogService.createPogSubjAuto(dto);
    }

    @Get('/get/pogSubjAuto/id/:idList')
    async getPogSubjAutoById(@Param('idList') idList: number){
        return this.pogService.getPogSubjAutoById(idList);
    }

    @Get('/get/all/pogSubjAuto')
    async getAllPogSubjAutos(){
        return this.pogService.getAllPogSubjAutos();
    }
    
    @Put('/update/pogSubjAuto')
    async updatePogSubjAuto(@Param('idList') idList: number, @Body() dto: CreatePogSubjAutoDTO){
        return this.pogService.updatePogSubjAuto(idList, dto);
    }

    @Put('/delete/pogSubjAuto/:idList')
    async deletePogSubjAutoById(@Param('idList') idList: number){
        return this.pogService.deletePogSubjAutoById(idList);
    }

    @Post('/create')
    async createPogSubjWater(@Body() dto: CreatePogSubjWaterDTO){
        return this.pogService.createPogSubjWater(dto);
    }

    @Get('/get/id/:idList')
    async getPogSubjWaterById(@Param('idList') idList: number){
        return this.pogService.getPogSubjWaterById(idList);
    }

    @Get('/get/all')
    async getAllPogSubjWaters(){
        return this.pogService.getAllPogSubjWaters();
    }
    
    @Put('/update')
    async updatePogSubjWater(@Param('idList') idList: number, @Body() dto: CreatePogSubjWaterDTO){
        return this.pogService.updatePogSubjWater(idList, dto);
    }

    @Put('/delete/:idList')
    async deletePogSubjWaterById(@Param('idList') idList: number){
        return this.pogService.deletePogSubjWaterById(idList);
    }


}