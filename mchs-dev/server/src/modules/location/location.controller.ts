import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDTO } from './dto/location.dto';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService){}

    @Post('/add')
    addLocation(@Body() dto: LocationDTO){
        console.log(dto);
        return this.locationService.addLocation(dto);
    }

    @Get('/get/all')
    async getAllLocation(){
        return this.locationService.getAllLocation();
    }

    @Get('/get/id/:uid')
    async getLocationsByUserId(@Param('uid') uid: number){
        const locations = await this.locationService.getLocationsByUserId(uid);
        
        return locations;
    }
}
