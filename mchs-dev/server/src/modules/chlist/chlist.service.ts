import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ChlistNotFoundException } from "./exception/chlist.not-found.exception";
import { SChlist } from "src/entities/mchs/SChlist";


@Injectable()
export class ChlistService{
    constructor(@InjectRepository(SChlist, 'mchs_connection') private chlistRepository: Repository<SChlist>){}
    
    async getChlistById(idChlist: number){
        const chlist = await this.chlistRepository.findOneBy({idChlist});
        if(!chlist){
            throw new ChlistNotFoundException(idChlist);
        }
        return chlist;
    }

    async getAllChlists(): Promise<SChlist[]>{
        const chlists = this.chlistRepository.find({where: {active:1}});
        return chlists;
    }
    
}