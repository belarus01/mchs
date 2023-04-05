import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OonService } from './oon.service';
import { CreateOonDTO } from './dto/create-oon.dto';

@Controller('oon')
export class OonController {
    constructor(private oonService: OonService){}

    @Post('/create')
    async createOon(@Body() dto: CreateOonDTO){
        return this.oonService.createOon(dto);
    }

    @Get('/get/id/:idType')
    async getOonById(@Param('idType') idType: number){
        return this.oonService.getOonById(idType);
    }

    @Get('/get/all')
    async getAllOons(){
        return this.oonService.getAllOons();
    }
    
    @Put('/update')
    async updateOon(@Param('idType') idType: number, @Body() dto: CreateOonDTO){
        return this.oonService.updateOon(idType, dto);
    }

    @Put('/delete/:idType')
    async deleteOon(@Param('idType') idType: number){
        return this.oonService.deleteOon(idType);
    }
}
