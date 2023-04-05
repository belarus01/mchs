import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeTestDTO } from './dto/create-typeTest.dto';

@Controller('type')
export class TypeController {
    constructor(private typeTestService: TypeService){}

    @Post('/create/typeTest')
    async createTypeTest(@Body() dto: CreateTypeTestDTO){
        return this.typeTestService.createTypeTest(dto);
    }

    @Get('/get/typeTest/id/:idTypeTest')
    async getTypeTestById(@Param('idTypeTest') idTypeTest: number){
        return this.typeTestService.getTypeTestById(idTypeTest);
    }

    @Get('/get/all/typeTests')
    async getAllTypeTests(){
        return this.typeTestService.getAllTypeTests();
    }
    
    @Put('/update/typeTest')
    async updateTypeTest(@Param('idTypeTest') idTypeTest: number, @Body() dto: CreateTypeTestDTO){
        return this.typeTestService.updateTypeTest(idTypeTest, dto);
    }

    @Put('/delete/typeTest/:idTypeTest')
    async deleteTypeTestById(@Param('idTypeTest') idTypeTest: number){
        return this.typeTestService.deleteTypeTestById(idTypeTest);
    }
}
