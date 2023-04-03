import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SSoato } from './entity/soato.entity';
import { SoatoService } from './soato.service';
import { CreateSoatoDTO } from './dto/create-soato.dto';

@Controller('soato')
export class SoatoController {
    constructor(private soatoService: SoatoService){}

    @Post('/create')
    async createSoato(@Body() soatoDto: CreateSoatoDTO){
        return this.soatoService.createSoato(soatoDto);
    }

    @Get('/get/id/:idSoato')
    async getSoatoById(idSoato: number){
        return await this.soatoService.getSoatoById(idSoato);
    }

    @Get('/get/all')
    getAllObjs(): Promise<SSoato[]>{
        
        return this.soatoService.getAll();
    }

    @Put('/update/:idSoato')
    async updateSoato(idSoato: number, dto: CreateSoatoDTO){
        return this.soatoService.updateSoato(idSoato, dto);
    }

    @Delete('delte/:idSoato')
    async deleteSoato(@Param('idSoato') idSoato: number){
        return this.soatoService.deleteSoato(idSoato);
    }
}
