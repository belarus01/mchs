import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AdmService } from './adm.service';
import { CreateAdmBanDTO } from './dto/create-admBan.dto';
import { CreateAdmForceDTO } from './dto/create-admForce.dto';

@Controller('adm')
export class AdmController {
    constructor(private admService: AdmService){}

    @Post('/create/admBan')
    async createAdmBan(@Body() dto: CreateAdmBanDTO){
        return this.admService.createAdmBan(dto);
    }

    @Post('/create/admForce')
    async createAdmForce(@Body() dto: CreateAdmForceDTO){
        return this.admService.createAdmForce(dto);
    }

    @Get('/get/admBan/id/:idBan')
    async getAdmBanById(@Param('idBan') idBan: number){
        return await this.admService.getAdmBanById(idBan);
    }

    @Get('/get/admForce/id/:idForce')
    async getAdmForceById(@Param('idForce') idForce: number){
        return await this.admService.getAdmForceById(idForce);
    }

    @Get('/get/all/admBan')
    async getAllAdmBans(){
        return this.admService.getAllAdmBans();
    }

    @Get('/get/all/admForce')
    async getAllAdmForces(){
        return this.admService.getAllAdmForces();
    }

    @Put('/update/admBan/:idBan')
    async updateAdmBan(@Param('idBan') idBan: number, @Body() dto: CreateAdmBanDTO){
        return this.admService.updateAdmBan(idBan, dto);
    }

    @Put('/update/admForce/:idForce')
    async upadateAdmForce(@Param('idForce') idForce: number, @Body() dto: CreateAdmForceDTO){
        return this.admService.updateAdmForce(idForce, dto);
    }

    @Put('/delete/admBan/:idBan')
    async deleteAdmBanById(@Param('idBan') idBan: number){
        return this.admService.deleteAdmBanById(idBan);
    }

    @Put('/delete/admForce/:idForce')
    async deleteAdmForceById(idForce: number){
        return this.admService.deleteAdmForceById(idForce);
    }
}
