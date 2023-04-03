import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDeptDTO } from './dto/create-department.dto';
import { CreateDeptUnitDTO } from './dto/create-departmentUnit.dto';

@Controller('department')
export class DepartmentController {
    constructor(private deptService: DepartmentService){}

    @Post('/create/dept')
    async createDept(@Body() dto: CreateDeptDTO){
        return this.deptService.createDept(dto);
    }

    @Post('/create/deptUnit')
    async createDeptUnit(@Body() dto: CreateDeptUnitDTO){
        return this.deptService.createDeptUnit(dto);
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

    @Put('/update/dept/:idDept')
    async updateDept(@Param('idDept') idDept: number,@Body() dto: CreateDeptDTO){
        return this.deptService.updateDept(idDept, dto);
    }

    @Put('/update/deptUnit/:idDeptUnits')
    async updateDeptUnit(@Param('idDeptUnit')idDeptUnits: number,@Body() dto: CreateDeptUnitDTO){
        return this.deptService.updateDeptUnit(idDeptUnits, dto);
    }

    @Put('/delete/dept/:idDept')
    async deleteDeptById(@Param('idDept') idDept: number){
        return this.deptService.deleteDeptById(idDept);
    }

    @Put('/delete/deptUnit/:idDeptUnit')
    async deleteDeptUnitById(@Param('idDept') idDeptUnit: number){
        return this.deptService.deleteDeptUnitById(idDeptUnit);
    }

}
