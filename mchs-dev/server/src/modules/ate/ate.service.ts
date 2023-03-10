import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SAteCateg } from './entity/ateCateg.entity';
import { SAteObl } from './entity/ateObl.entity';
import { SAteRayon } from './entity/ateRayon.entity';
import { SAteReestr } from './entity/ateReestr.entity';
import { SAteStreet } from './entity/ateStreet.entity';
import { AteNotFoundException } from './exception/ate.not-found.exception';

@Injectable()
export class AteService {
    constructor(
    @InjectRepository(SAteCateg, 'mchs_connection') private ateCategRepository: Repository<SAteCateg>,
    @InjectRepository(SAteObl, 'mchs_connection') private ateOblRepository: Repository<SAteObl>,
    @InjectRepository(SAteRayon, 'mchs_connection') private ateRayonRepository: Repository<SAteRayon>,
    @InjectRepository(SAteReestr, 'mchs_connection') private ateReestrRepository: Repository<SAteReestr>,
    @InjectRepository(SAteStreet, 'mchs_connection') private ateStreetRepository: Repository<SAteStreet>){}

    async getCategById(idCateg: number){
        const categ = this.ateCategRepository.findOneBy({idCateg});
        if(!categ){
            throw new AteNotFoundException();
        }
        return categ;
    }

    async getAllCategs(): Promise<SAteCateg[]>{
        const categs = this.ateCategRepository.find({where: {
            active:1
        }});
        return categs;
    }

    async getOblById(idObl: number): Promise<SAteObl>{
        const obl = this.ateOblRepository.findOneBy({idObl});
        if(!obl){
            throw new AteNotFoundException();
        }
        return obl;
    }

    async getAllObls(): Promise<SAteObl[]>{
        const obls = this.ateOblRepository.find({where: {
            active:1
        }});
        return obls;
    }

  
    async getAllRayonsByOblId(idObl: number): Promise<SAteRayon[]>{
        const rayons = await this.ateRayonRepository.find({where: {
            active:1, idObl: idObl
        }});
        if(rayons.length == 0){
            throw new AteNotFoundException;
        }
        return rayons;
    }
    
    async getAllReestrsByOblId(idObl: number): Promise<SAteReestr[]>{
        const reestrs = await this.ateReestrRepository.find({where:{
            active:1, idObl: idObl
        }});
        if(reestrs.length == 0){
            throw new AteNotFoundException;
        }
        return reestrs;
    }

    async getRayonById(idRayon: number): Promise<SAteRayon>{
        const rayon = this.ateRayonRepository.findOneBy({idRayon});
        if(!rayon){
            throw new AteNotFoundException();
        }
        return rayon;
    }

    async getAllRayons(): Promise<SAteRayon[]>{
        const  rayons = this.ateRayonRepository.find({where: {
            active:1
        }});
        return rayons;
    }

    async getReestrById(idReestr: number): Promise<SAteReestr>{
        const reestr = this.ateReestrRepository.findOneBy({idReestr});
        if(!reestr){
            throw new AteNotFoundException();
        }
        return reestr;
    }


    async getAllReestrs(): Promise<SAteReestr[]>{
        const  reestrs = this.ateReestrRepository.find({where: {
            active:1
        }});
        return reestrs;
    }

//idReestr заменен на idStreet
    async getStreetById(idStreet: number): Promise<SAteStreet>{
        const street = this.ateStreetRepository.findOneBy({idStreet});
        if(!street){
            throw new AteNotFoundException();
        }
        return street;
    }

    async getAllStreets(): Promise<SAteStreet[]>{
        const  streets = this.ateStreetRepository.find({where: {
            active:1
        }});
        return streets;
    }


    

    //WithSaotoRealations

    //updateAll

}
