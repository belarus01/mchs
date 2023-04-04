import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SSoato } from './entity/soato.entity';
import { CreateSoatoDTO } from './dto/create-soato.dto';
import { SoatoNotFoundException } from './exception/soato.not-found.exception';

@Injectable()
export class SoatoService {
    constructor(@InjectRepository(SSoato, 'mchs_connection') private soatoRepository: Repository<SSoato>){}

    async createSoato(soatoDto: CreateSoatoDTO): Promise<SSoato>{
        const soato = this.soatoRepository.create(soatoDto);
        return this.soatoRepository.save(soato);
    }

    async getSoatoById(idSoato: number): Promise<SSoato>{
        const soato = await this.soatoRepository.findOneBy({idSoato});
        if(!soato){
            throw new SoatoNotFoundException(idSoato);
        }
        return soato;
    }

    async getAll(): Promise<SSoato[]>{
        const objects = await this.soatoRepository.find();
        console.log(objects[1].name);
        return objects;
    }

    async updateSoato(idSoato: number, dto: CreateSoatoDTO){
        return await this.soatoRepository.update(idSoato, dto);
    }

    async deleteSoato(idSoato: number){//в бд отсутствует поле статуса(поле active), следовательно тут получается просто delete
        return await this.soatoRepository.delete(idSoato);
    }

}
