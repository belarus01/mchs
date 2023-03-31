import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateNotFoundException } from './exception/state.not-found.exception';
import { SState } from './state.entity';

@Injectable()
export class StateService {
    constructor(@InjectRepository(SState, 'doc_connection') private stateRepository: Repository<SState>){}

    async getStateById(idState: number): Promise<SState>{
        const state = await this.stateRepository.findOneBy({idState});
        if(!state){
            throw new StateNotFoundException(idState);
        }
        return state;
    }

    async getAllStates(): Promise<SState[]>{
        const state = await this.stateRepository.find({where: {
            active: 1
        }});
        return state;
    }
}
