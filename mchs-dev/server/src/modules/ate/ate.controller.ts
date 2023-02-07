import { Controller, Get, Param } from '@nestjs/common';
import { AteService } from './ate.service';

@Controller('ate')
export class AteController {
    constructor(private ateService: AteService){}

    @Get('/get/categ/:idCateg')
    async getCategById(@Param('idCateg') idCateg: number){
        const categ = this.ateService.getCategById(idCateg);
        return categ;
    }

    @Get('/get/obl/:idObl')
    async getOblById(@Param('idObl') idObl: number){
        const obl = this.ateService.getOblById(idObl);
        return obl;
    }

    @Get('/get/rayon/:idRayon')
    async getRayonById(@Param('idRayon') idRayon: number){
        const rayon = this.ateService.getRayonById(idRayon);
        return rayon;
    }

    @Get('/get/street/:idStreet')
    async getStreetById(@Param('idStreet') idStreet: number){
        const street = this.ateService.getStreetById(idStreet);
        return street;
    }

    @Get('/get/all/categs')
    async getAllCategs(){
        return this.ateService.getAllCategs();
    }

    @Get('/get/all/obls')
    async getAllObls(){
        return this.ateService.getAllObls();
    }

    @Get('/get/all/reestrs')
    async getAllReestrs(){
        return this.ateService.getAllReestrs();
    }

    @Get('/get/all/rayons')
    async getAllRayons(){
        return this.ateService.getAllRayons();
    }

    @Get('/get/all/streets')
    async getAllStreets(){
        return this.ateService.getAllStreets();
    } 


    @Get('/get/rayons/in_obl/:idObl')
    async getAllRayonsByOblId(@Param('idObl') idObl: number){
        const rayons = await this.ateService.getAllRayonsByOblId(idObl);
        return rayons;
    }

    @Get('/get/reestrs/in_obl/:idObl')
    async getAllReestrsByOblId(@Param('idObl') idObl: number){
        const reestrs = await this.ateService.getAllReestrsByOblId(idObl);
        return reestrs;
    }
    
}
