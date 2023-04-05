import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SForm } from './entity/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDTO } from './dto/create-form.dto';
import { FormNotFoundException } from './exception/form.not-found.exception';
import { SFormBuild1 } from './entity/formBuild1.entity';
import { SFormBuild2 } from './entity/formbuild2.entity';
import { SFormBuildData } from './entity/formBuildData.entity';
import { CreateFormBuildDTO } from './dto/create-formBuild.dto';
import { SFormBuild } from './entity/formBuild.entity';
import { CreateFormBuild1DTO } from './dto/create-formBuild1.dto';
import { CreateFormBuild2DTO } from './dto/create-formBuild2.dto';
import { CreateFormBuildDataDTO } from './dto/create-formBuildData.dto';

@Injectable()
export class FormService {
    constructor(@InjectRepository(SForm, 'doc_connection') private formRepository: Repository<SForm>,
    @InjectRepository(SFormBuild, 'doc_connection') private formBuildRepository: Repository<SFormBuild>,
    @InjectRepository(SFormBuild1, 'doc_connection') private formBuild1Repository: Repository<SFormBuild1>,
    @InjectRepository(SFormBuild2, 'doc_connection') private formBuild2Repository: Repository<SFormBuild2>,
    @InjectRepository(SFormBuildData, 'doc_connection') private formBuildDataRepository: Repository<SFormBuildData>,){}

    async createForm(dto: CreateFormDTO){
        const form = this.formRepository.create(dto);
        return this.formRepository.save(form);
    }

    async createFormBuild(dto: CreateFormBuildDTO){
        const form = this.formBuildRepository.create(dto);
        return this.formBuildRepository.save(form);
    }

    async createFormBuild1(dto: CreateFormBuild1DTO){
        const form = this.formBuild1Repository.create(dto);
        return this.formBuild1Repository.save(form);
    }

    async createFormBuild2(dto: CreateFormBuild2DTO){
        const form = this.formBuild2Repository.create(dto);
        return this.formBuild2Repository.save(form);
    }

    async createFormBuildData(dto: CreateFormBuildDataDTO){
        const form = this.formBuild2Repository.create(dto);
        return this.formBuild2Repository.save(form);
    }


    async getFormBuildById(idBuild: number){
        const form = await this.formBuildRepository.findOneBy({idBuild});
        if(!form){
            throw new FormNotFoundException(idBuild);
        }
        return form;
    }

    async getFormBuild1ById(idBuild1: number){
        const form = await this.formBuild1Repository.findOneBy({idBuild1});
        if(!form){
            throw new FormNotFoundException(idBuild1);
        }
        return form;
    }

    async getFormBuild2ById(idBuild2: number){
        const form = await this.formBuild2Repository.findOneBy({idBuild2});
        if(!form){
            throw new FormNotFoundException(idBuild2);
        }
        return form;
    }

    async getFormBuildDataById(idData: number){
        const form = await this.formBuildDataRepository.findOneBy({idData});
        if(!form){
            throw new FormNotFoundException(idData);
        }
        return form;
    }

    async getFormById(idForm: number){
        const form = await this.formRepository.findOneBy({idForm});
        if(!form){
            throw new FormNotFoundException(idForm);
        }
        return form;
    }


    async getAllFormBuilds(){
        return await this.formBuildRepository.find();
    }

    async getAllFormBuild1s(){
        return await this.formBuild1Repository.find();
    }

    async getAllFormBuild2s(){
        return await this.formBuild2Repository.find();
    }

    async getAllFormBuildData(){
        return await this.formRepository.find();
    }

    async getAllForms(){
        return await this.formRepository.find();
    }


    async updateFormBuild(idBuild: number, dto: CreateFormBuildDTO){
        return await this.formBuildRepository.update(idBuild, dto);
    }

    async updateFormBuild1(idBuild1: number, dto: CreateFormBuild1DTO){
        return await this.formBuild1Repository.update(idBuild1, dto);
    }

    async updateFormBuild2(idBuild2: number, dto: CreateFormBuild2DTO){
        return await this.formBuild2Repository.update(idBuild2, dto);
    }

    async updateFormBuildData(idData: number, dto: CreateFormBuildDataDTO){
        return await this.formBuildDataRepository.update(idData, dto);
    }

    async updateForm(idForm: number, dto: CreateFormDTO){
        return await this.formRepository.update(idForm, dto);
    }


    async deleteFormBuildById(idBuild: number){
        return await this.formBuildRepository.update(idBuild, {active: 2});
    }

    async deleteFormBuild1ById(idBuild1: number){
        return await this.formBuild1Repository.update(idBuild1, {active: 2});
    }

    async deleteFormBuild2ById(idBuild2: number){
        return await this.formBuild2Repository.update(idBuild2, {active: 2});
    }

    async deleteFormBuildDataById(idData: number){
        return await this.formBuildDataRepository.delete(idData);//отсутствет поле 'active'
    }

    async deleteFormById(idForm: number){
        return await this.formRepository.update(idForm, {active: 2});
    }
}
