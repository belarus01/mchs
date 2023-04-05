import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePooDTO } from './dto/create-poo.dto';
import { PooService } from './poo.service';

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
    async deletePoo(@Param('idPoo') idPoo: number){
        return this.pooService.deletePoo(idPoo);
    }
}
