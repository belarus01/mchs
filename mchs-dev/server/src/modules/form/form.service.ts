import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SForm } from './entity/form.entity';
import { Repository } from 'typeorm';
import { CreateFormDTO } from './dto/create-form.dto';
import { FormNotFoundException } from './exception/form.not-found.exception';

@Injectable()
export class FormService {
    constructor(@InjectRepository(SForm, 'doc_connection') private formRepository: Repository<SForm>){}

    async createForm(dto: CreateFormDTO){
        const form = this.formRepository.create(dto);
        return this.formRepository.save(form);
    }

    async getFormById(idForm: number){
        const form = await this.formRepository.findOneBy({idForm});
        if(!form){
            throw new FormNotFoundException(idForm);
        }
        return form;
    }

    async getAllForms(){
        return await this.formRepository.find();
    }

    async updateForm(idForm: number, dto: CreateFormDTO){
        return await this.formRepository.update(idForm, dto);
    }

    async deleteFormById(idForm: number){
        return await this.formRepository.update(idForm, {active: 2});
    }
}
