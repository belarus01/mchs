import { Body, Controller, Post } from '@nestjs/common';
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
}
