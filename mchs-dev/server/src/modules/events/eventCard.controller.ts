import { Controller, Get } from "@nestjs/common";
import { EventCardService } from "./eventCard.service";

@Controller('eventCard')
export class EventCardController {
    constructor(private eventCardService: EventCardService){

    }

    @Get('/get/first')
    getFirst(){
        return this.eventCardService.getFirstPart();
    }
}