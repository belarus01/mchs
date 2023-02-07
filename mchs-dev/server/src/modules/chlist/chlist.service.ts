import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SChlist } from "./entity/chlist.entity";
import { ChlistNotFoundException } from "./exception/chlist.not-found.exception";

@Injectable()
export class ChlistService{
    constructor(@InjectRepository(SChlist) private chlistRepository: Repository<SChlist>){}
    
    async getChlistById(idChlist: number): Promise<SChlist>{
        const chlist = this.chlistRepository.findOneBy({idChlist});
        if(!chlist){
            throw new ChlistNotFoundException(idChlist);
        }
        return chlist;
    }

    async getAllChlists(): Promise<SChlist[]>{
        const chlists = this.chlistRepository.find({where: {active:1}})
        return chlists;
    }
    
}