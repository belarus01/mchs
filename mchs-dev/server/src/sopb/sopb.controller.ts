import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateSopbDTO } from './dto/create-sopb.dto';
import { CreateSopbCardDTO } from './dto/create-sopbCard.dto';
import { SopbService } from './sopb.service';

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

    @Get('/get/id/:idSopb')
    async getSopbById(@Param('idSopb') idSopb: number){
        return await this.sopbService.getSopbById(idSopb);
    }

    @Get('/get/sopbCard/id/:idCard')
    async getSopbCardById(@Param('idCard') idCard: number){
        return await this.sopbService.getSopbCardById(idCard);
    }

    @Get('/get/all')
    async getAllSopbs(){
        return this.sopbService.getAllSopbs();
    }

    @Get('/get/all/sopbCard')
    async getAllSopbCards(){
        return this.sopbService.getAllSopbCards();
    }

    @Put('/update/:idSopb')
    async updateSopb(@Param('idSopb') idSopb: number, @Body() dto: CreateSopbDTO){
        return this.sopbService.updateSopb(idSopb, dto);
    }

    @Put('/update/sopbCard/:idCard')
    async upadateSopbCard(@Param('idCard') idCard: number, @Body() dto: CreateSopbCardDTO){
        return this.sopbService.upadateSopbCard(idCard, dto);
    }

    @Put('/delete/:idSopb')
    async deleteSopbById(@Param('idSopb') idSopb: number){
        return this.sopbService.deleteSopbById(idSopb);
    }

    @Put('/delete/sopbCard/:idCard')
    async deleteSopbCardById(idCard: number){
        return this.sopbService.deleteSopbCardById(idCard);
    }
}
