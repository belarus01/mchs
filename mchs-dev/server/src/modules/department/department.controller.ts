import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    constructor(private deptService: DepartmentService){

    }

    @Get('/get/id/:idDept')
    async getDeptById(@Param('idDept') idDept: number){
        const dept = this.deptService.getDeptById(idDept);
        return dept;
    }

    @Get('/get/unit/id/:idDeptUnits')
    async getDeptUnitById(@Param('idDeptUnits') idDeptUnits: number){
        const deptUnit = this.deptService.getDeptUnitById(idDeptUnits);
        return deptUnit;
    }

    @Get('/get/mchs/all')
    async getAllMchsDepts(){
        return this.deptService.getAllMchsDepts();
    }

    @Get('/get/nadz/all')
    async getAllNadzDepts(){
        return this.deptService.getAllNadzDepts();
    }

    @Get('/get')
    getAllDepts(){
        return this.deptService.getAllDepts();
    }

    @Get('/get/units')
    getAllDeptUnits(){
        return this.deptService.getAllDeptUnits();
    }
}
