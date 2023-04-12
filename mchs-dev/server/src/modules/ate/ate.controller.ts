import { Controller, Get, Param, Query } from '@nestjs/common';
import { AteService } from './ate.service';
import { Order, Pagination } from 'src/utils/utils';

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

    @Get('get/all/rayons/sorted/by/page')
    async getAllAteRayonsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.ateService.getAllAteRayonsSortAndPage(field, order, current, pageSize, total);
    }

    @Get('/get/all/streets')
    async getAllStreets(){
        return this.ateService.getAllStreets();
    } 

    @Get('get/all/streets/sorted/by/page')
    async getAllAteStreetsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.ateService.getAllAteStreetsSortAndPage(field, order, current, pageSize, total);
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

    @Get('/get/reestrs/id_rayon/:idRayon')
    async getAllReestrsByRayonId(@Param('idRayon') idRayon:number){
        const reestrs = await this.ateService.getAllReestrsByRayonId(idRayon);
        return reestrs;
    }
    @Get('/get/streets/id_city/:idCity')
    async getAllStreetsByCityId(@Param('idCity') idCity:number){
        const streets = await this.ateService.getStreetsByCityId(idCity);
        return streets;
    }
    
}
