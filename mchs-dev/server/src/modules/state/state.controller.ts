import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
    constructor(private stateService: StateService){}

    @Get('/get/all')
    async getAllStates(){
        return this.stateService.getAllStates();
    }

    @Get('/get/id/:idState')
    async getStateById(@Param('idState') idState: number){
        return this.stateService.getStateById(idState);
    }
}
