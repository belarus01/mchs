import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateSopbDTO } from './dto/create-sopb.dto';
import { CreateSopbCardDTO } from './dto/create-sopbCard.dto';
import { SopbService } from './sopb.service';
import { CreateSopbCardSubjDTO } from './dto/create-sopbCardSubj.dto';
import { Order, Pagination } from 'src/utils/utils';

@Controller('sopb')
export class SopbController {
    constructor(private sopbService: SopbService){}

    @Post('/create/sopb')
    async createSopb(@Body() dto: CreateSopbDTO){
        return this.sopbService.createSopb(dto);
    }

    @Post('/create/sopbCard')
    async createSopbCard(@Body() dto: CreateSopbCardDTO){
        return this.sopbService.createSopbCard(dto);
    }

    @Post('/create/sopbCardSubj')
    async createSopbCardSubj(@Body() dto: CreateSopbCardSubjDTO){
        return this.sopbService.createSopbCardSubj(dto);
    }

    @Get('/get/id/:idSopb')
    async getSopbById(@Param('idSopb') idSopb: number){
        return await this.sopbService.getSopbById(idSopb);
    }

    @Get('/get/sopbCard/id/:idCard')
    async getSopbCardById(@Param('idCard') idCard: number){
        return await this.sopbService.getSopbCardById(idCard);
    }

    @Get('/get/sopbCardSubj/id/:idData')
    async getSopbCardSubjById(@Param('idData') idData: number){
        return await this.sopbService.getSopbCardSubjById(idData);
    }

    @Get('/get/all')
    async getAllSopbs(){
        return this.sopbService.getAllSopbs();
    }

    @Get('/get/all/sopbCard')
    async getAllSopbCards(){
        return this.sopbService.getAllSopbCards();
    }

    @Get('get/all/sopbCardSubjs/sorted/by/page')
    async getAllObjectsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.sopbService.getAllSopbCardSubjsSortAndPage(field, order, current, pageSize, total);
    }

    @Get('/get/sopbCards/idSopb/:idSopb')
    async getSopbCardBySopbId(@Param('idSopb') idSopb: number){
        return await this.sopbService.getSopbCardsBySopbId(idSopb);
    }

    @Put('/update/:idSopb')
    async updateSopb(@Param('idSopb') idSopb: number, @Body() dto: CreateSopbDTO){
        return this.sopbService.updateSopb(idSopb, dto);
    }

    @Put('/update/sopbCard/:idCard')
    async updateSopbCard(@Param('idCard') idCard: number, @Body() dto: CreateSopbCardDTO){
        return this.sopbService.updateSopbCard(idCard, dto);
    }

    @Put('/update/sopbCardSubj/:idData')
    async updateSopbCardSubj(@Param('idData') idData: number, @Body() dto: CreateSopbCardSubjDTO){
        return this.sopbService.updateSopbCardSubj(idData, dto);
    }

    @Put('/delete/:idSopb')
    async deleteSopbById(@Param('idSopb') idSopb: number){
        return this.sopbService.deleteSopbById(idSopb);
    }

    @Put('/delete/sopbCard/:idCard')
    async deleteSopbCardById(idCard: number){
        return this.sopbService.deleteSopbCardById(idCard);
    }

    @Put('/delete/sopbCard/:idData')
    async deleteSopbCardSubjById(idData: number){
        return this.sopbService.deleteSopbCardSubjById(idData);
    }
}
