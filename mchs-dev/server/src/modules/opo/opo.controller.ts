import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OpoService } from './opo.service';
import { CreateOpoDTO } from './dto/create-opo.dto';

@Controller('opo')
export class OpoController {
    constructor(private opoService: OpoService){}

    @Post('/create')
    async createOpo(@Body() dto: CreateOpoDTO){
        return this.opoService.createOpo(dto);
    }

    @Get('/get/id/:idOpo')
    async getOpoById(@Param('idOpo') idOpo: number){
        return this.opoService.getOpoById(idOpo);
    }

    @Get('/get/all')
    async getAllOpos(){
        return this.opoService.getAllOpos();
    }
    
    @Put('/update')
    async updateOpo(@Param('idOpo') idOpo: number, @Body() dto: CreateOpoDTO){
        return this.opoService.updateOpo(idOpo, dto);
    }

    @Put('/delete/:idOpo')
    async deleteOpoById(@Param('idOpo') idOpo: number){
        return this.opoService.deleteOpoById(idOpo);
    }
}
