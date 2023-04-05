import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from './dto/create-form.dto';
import { CreateFormBuild1DTO } from './dto/create-formBuild1.dto';
import { CreateFormBuildDTO } from './dto/create-formBuild.dto';
import { CreateFormBuild2DTO } from './dto/create-formBuild2.dto';
import { CreateFormBuildDataDTO } from './dto/create-formBuildData.dto';

@Controller('form')
export class FormController {
    constructor(private formService: FormService){}

    @Post('/create')
    async createForm(@Body() dto: CreateFormDTO){
        return this.formService.createForm(dto);
    }

    @Post('/create/formBuild')
    async createFormBuild(@Body() dto: CreateFormBuildDTO){
        return this.formService.createFormBuild(dto);
    }

    @Post('/create/formBuild1')
    async createFormBuild1(@Body() dto: CreateFormBuild1DTO){
        return this.formService.createFormBuild1(dto);
    }

    @Post('/create/formBuild2')
    async createFormBuild2(@Body() dto: CreateFormBuild2DTO){
        return this.formService.createFormBuild2(dto);
    }

    @Post('/create/formBuildData')
    async createFormBuildData(@Body() dto: CreateFormBuildDataDTO){
        return this.formService.createFormBuildData(dto);
    }


    @Get('/get/formBuild/id/:idBuild')
    async getFormBuildById(@Param('idBuild') idBuild: number){
        return this.formService.getFormBuildById(idBuild);
    }

    @Get('/get/formBuild1/id/:idBuild1')
    async getFormBuild1ById(@Param('idBuild1') idBuild1: number){
        return this.formService.getFormBuild1ById(idBuild1);
    }

    @Get('/get/formBuild2/id/:idBuild2')
    async getFormBuild2ById(@Param('idBuild2') idBuild2: number){
        return this.formService.getFormBuild2ById(idBuild2);
    }

    @Get('/get/formBuildData/id/:idData')
    async getFormBuildDataById(@Param('idData') idData: number){
        return this.formService.getFormBuildDataById(idData);
    }

    @Get('/get/id/:idForm')
    async getFormById(@Param('idForm') idForm: number){
        return this.formService.getFormById(idForm);
    }
    

    @Get('/get/all')
    async getAllForms(){
        return this.formService.getAllForms();
    }

    @Get('/get/all/formBuild')
    async getAllFormBuilds(){
        return this.formService.getAllFormBuilds();
    }

    @Get('/get/all/formBuild1')
    async getAllFormBuild1s(){
        return this.formService.getAllFormBuild1s();
    }

    @Get('/get/all/formBuild2')
    async getAllFormBuild2s(){
        return this.formService.getAllFormBuild2s();
    }

    @Get('/get/all/formBuildData')
    async getAllFormBuildData(){
        return this.formService.getAllFormBuildData();
    }


    @Put('/update')
    async updateForm(@Param('idForm') idForm: number, @Body() dto: CreateFormDTO){
        return this.formService.updateForm(idForm, dto);
    }

    @Put('/update/formBuild')
    async updateFormBuild(@Param('idBuild') idBuild: number, @Body() dto: CreateFormBuildDTO){
        return this.formService.updateFormBuild(idBuild, dto);
    }

    @Put('/update/formBuild1')
    async updateFormBuild1(@Param('idBuild1') idBuild1: number, @Body() dto: CreateFormBuild1DTO){
        return this.formService.updateFormBuild1(idBuild1, dto);
    }

    @Put('/update/formBuild2')
    async updateFormBuild2(@Param('idBuild2') idBuild2: number, @Body() dto: CreateFormBuild2DTO){
        return this.formService.updateFormBuild2(idBuild2, dto);
    }

    @Put('/update/formBuildData')
    async updateFormBuildData(@Param('idData') idData: number, @Body() dto: CreateFormBuildDataDTO){
        return this.formService.updateFormBuildData(idData, dto);
    }


    @Put('/delete/:idForm')
    async deleteFormById(@Param('idForm') idForm: number){
        return this.formService.deleteFormById(idForm);
    }

    @Put('/delete/:idFormBuild')
    async deleteFormBuildById(@Param('idBuild') idBuild: number){
        return this.formService.deleteFormBuildById(idBuild);
    }

    @Put('/delete/:idBuild1')
    async deleteFormBuild1ById(@Param('idBuild1') idBuild1: number){
        return this.formService.deleteFormBuild1ById(idBuild1);
    }

    @Put('/delete/:idBuild2')
    async deleteFormBuild2ById(@Param('idBuild2') idBuild2: number){
        return this.formService.deleteFormBuild1ById(idBuild2);
    }
    

    @Put('/delete/:idData')
    async deleteFormBuildDataById(@Param('idData') idData: number){
        return this.formService.deleteFormBuildDataById(idData);
    }
}
