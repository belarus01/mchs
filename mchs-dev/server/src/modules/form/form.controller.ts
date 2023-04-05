import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from './dto/create-form.dto';

@Controller('form')
export class FormController {
    constructor(private formService: FormService){}

    @Post('/create')
    async createForm(@Body() dto: CreateFormDTO){
        return this.formService.createForm(dto);
    }

    @Get('/get/id/:idForm')
    async getFormById(@Param('idForm') idForm: number){
        return this.formService.getFormById(idForm);
    }

    @Get('/get/all')
    async getAllForms(){
        return this.formService.getAllForms();
    }

    @Put('/update')
    async updateForm(@Param('idForm') idForm: number, @Body() dto: CreateFormDTO){
        return this.formService.updateForm(idForm, dto);
    }

    @Put('/delete/:idForm')
    async deleteFormById(@Param('idForm') idForm: number){
        return this.formService.deleteFormById(idForm);
    }
}
