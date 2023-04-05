import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DefectionService } from './defection.service';
import { CreateDefectionDTO } from './dto/create-defection.dto';

@Controller('defection')
export class DefectionController {
    constructor(private defectionService: DefectionService){}

    @Post('/create')
    async createDefection(@Body() dto: CreateDefectionDTO){
        return this.defectionService.createDefection(dto);
    }

    @Get('/get/id/:idDef')
    async getDefectionById(@Param('idDef') idDef: number){
        return await this.defectionService.getDefectionById(idDef);
    }

    @Get('/get/all')
    async getAllDefections(){
        return await this.defectionService.getAllDefections();
    }

    @Put('/update')
    async updateDefection(@Param('idDef') idDef: number, @Body() dto: CreateDefectionDTO){
        return this.defectionService.updateDefection(idDef, dto);
    }

    @Put('/delete/:idDef')
    async deleteDefectionById(@Param('idDef') idDef: number){
        return this.defectionService.deleteDefectionById(idDef);
    }
}
