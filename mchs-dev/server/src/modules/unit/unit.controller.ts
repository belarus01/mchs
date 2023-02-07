import { Controller, Get, Param } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {
    constructor(private unitService: UnitService){}

    @Get('/get/type_unit/:typeUnit')
    async getAllNamesByTypeUnit(@Param('typeUnit') typeUnit: number){
        const names = this.unitService.getAllNamesByTypeUnit(typeUnit);
        return names;
    }
}
