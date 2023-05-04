import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FireService } from './fire.service';
import { CreateFireCardBuildDTO } from './dto/create-fireCardBuild.dto';

@Controller('fire')
export class FireController {
    constructor(private fireService: FireService){}

    @Post('/create/fireCardBuild')
    async createFire(@Body() dto: CreateFireCardBuildDTO){
        return this.fireService.createFireCardBuild(dto);
    }

    @Get('/get/fireCardBuild/id/:idList')
    async getFireCardBuildById(@Param('idList') idList: number){
        return this.fireService.getFireCardBuildById(idList);
    }

    @Get('/get/all/fireCardBuild')
    async getAllFireCardBuilds(){
        return this.fireService.getAllFireCardBuilds();
    }

    @Get('/get/all/fireCardBuild/with/relations')
    async getAllFireCardBuilsWithRelations(){
        return this.fireService.getAllFireCardBuilsWithRelations();
    }

    @Get('/get/all/fireCardBuild/idSubjObj/:idSubjObj')
    async getAllFireCardBuildsBySubjObjId(@Param('idSubjObj') idSubjObj: number){
        return this.fireService.getAllFireCardBuildsBySubjObjId(idSubjObj);
    }

    @Put('/update/fireCardBuild')
    async updateFireCardBuild(@Param('idList') idList: number, @Body() dto: CreateFireCardBuildDTO){
        return this.fireService.updateFireCardBuild(idList, dto);
    }

    @Put('/delete/fireCardBuild/:idList')
    async deleteFireCardBuildById(@Param('idList') idList: number){
        return this.fireService.deleteFireCardBuildById(idList);
    }
}
