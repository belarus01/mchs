import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVedomstvoDTO } from './dto/create-vedomstvo.dto';
import { VedomstvoNotFoundException } from './exception/vedomstvo.not-found.exception';
import { SVedomstva } from './vedomstva.entity';

@Injectable()
export class VedomstvaService {
    constructor(@InjectRepository(SVedomstva, 'mchs_connection') private vedomstvaRepository: Repository<SVedomstva>){}

    async createVedomstvo(dto:CreateVedomstvoDTO): Promise<SVedomstva>{
        const vedomstvo = this.vedomstvaRepository.create(dto);
        return this.vedomstvaRepository.save(vedomstvo);
    }

    async getVedomstvoById(idVed: number): Promise<SVedomstva>{
        const vedomstvo = await this.vedomstvaRepository.findOneBy({idVed});
        if(!vedomstvo){
            throw new VedomstvoNotFoundException(idVed);
        }
        return vedomstvo;
    }

    async getAllVedomstvas(): Promise<SVedomstva[]>{
        const vedomstvas = await this.vedomstvaRepository.find();
        return vedomstvas;
    }

    async updateVedomstvo(idVed: number, dto:CreateVedomstvoDTO){
        return this.vedomstvaRepository.update(idVed, dto);
    }

    async deleteVedomstvo(idVed: number){//в бд отсутствует поле статуса(поле active), следовательно тут получается просто delete
        return this.vedomstvaRepository.delete(idVed);
    }
}
