import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateVedomstvoDTO } from './dto/create-vedomstvo.dto';
import { VedomstvaService } from './vedomstva.service';

@Controller('vedomstva')
export class VedomstvaController {
    constructor(private vedomstvaService: VedomstvaService){}

    @Post('/create')
    async createVedomstvo(@Body() dto: CreateVedomstvoDTO){
        return this.vedomstvaService.createVedomstvo(dto);
    }

    @Get('/get/id/:idVed')
    async getVedomstvoById(@Param('idVed') idVed: number){
        return this.vedomstvaService.getVedomstvoById(idVed);
    }

    @Get('/get/all')
    async getAllVedomstvas(){
        return this.vedomstvaService.getAllVedomstvas();
    }

    @Put('/update/:idVed')
    async updateVedomstvo(@Param('idVed') idVed: number, @Body() vedomstvaDto: CreateVedomstvoDTO){
        return this.vedomstvaService.updateVedomstvo(idVed, vedomstvaDto);        
    }

    @Delete('delete/:idVed')
    async deleteVedomstvo(@Param('idVed') idVed: number){
        return this.vedomstvaService.deleteVedomstvo(idVed);
    }
    
}
