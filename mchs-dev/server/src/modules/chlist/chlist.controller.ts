import { Controller, Get, Param} from "@nestjs/common";
import { ChlistService } from "./chlist.service";

@Controller('chlist')
export class ChlistController{
    constructor(private chlistService: ChlistService){}

    @Get('/get/id/:idChlist')
    async getChlistById(@Param('idChlist') idChlist: number){
        return this.chlistService.getChlistById(idChlist);
    }

    @Get('/get/all')
    async getAllChlists(){
        return this.chlistService.getAllChlists();
    }

}