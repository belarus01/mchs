import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDTO } from './dto/create-unit.dto';

@Controller('unit')
export class UnitController {
    constructor(private unitService: UnitService){}

    @Post('/create')
    async createUnit(@Body() dto: CreateUnitDTO){
        return this.unitService.createUnit(dto);
    }

    @Get('/get/id/:idUnit')
    async getUnitById(@Param('idUnit') idUnit: number){
        const unit = await this.unitService.getUnitById(idUnit);
        return unit;
    }

    @Get('/get/all')
    async getAllUnits(){
        return this.unitService.getAllUnits();
    }

    @Get('/get/type_unit/:typeUnit')
    async getAllNamesByTypeUnit(@Param('typeUnit') typeUnit: number){
        const names = this.unitService.getAllNamesByTypeUnit(typeUnit);
        return names;
    }

    @Put('/upadte/:idUnit')
    async updateUnit(@Param('idUnit') idUnit: number,@Body() dto: CreateUnitDTO){
        return this.unitService.updateUnit(idUnit, dto);
    }

    @Put('/delete/:idUnit')
    async deleteUnitById(@Param('idUnit') idUnit: number){
        return this.unitService.deleteUnitById(idUnit);
    }
}
