import { Controller, Post, Body, Get, Put, Delete, Param, NotFoundException, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateEventDTO } from './dto/create-event.dto';
import { GetNowDTO } from './dto/getNow.dto';
import { EventsService } from './events.service';


@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService){

    }

    @Post('/create')
    createEvent(@Body() eventDto: CreateEventDTO){
        return this.eventsService.createEvent(eventDto);
    }

    @Post('/send')
    sendNotification(){
        return this.eventsService.send();
    }

    @Get('/get/all')
    getAllEvents(){
        return this.eventsService.getAllEvents();
    }
 
    @Get('/get/all/day')
    async getAllDayEvents(@Body() dateNow:GetNowDTO){
        return this.eventsService.getAllDayEvents(dateNow);
    }

    @Get('/get/all/week')
    async getAllWeekEvents(@Body() dateNow:GetNowDTO){
        return this.eventsService.getAllWeekEvents(dateNow);
    }

    @Get('/get/all/month')
    async getAllMonthEvents(@Body() dateNow:GetNowDTO){
        return this.eventsService.getAllMonthEvents(dateNow);
    } 

    @Get('/get/Petya')
    async getPetyaTheBest(){
        return this.eventsService.getPetyaTheBest();
    }

    @Get('/get/id/:idEvent')
    async getEventById(@Param('idEvent') idEvent: number){
        const event = await this.eventsService.getEventById(idEvent);
        if(!event) throw new NotFoundException('Event does not exist');
        return event;
    }

    @Get('/get/:idEvent/beginDate')
    async getEventBeginDateById(@Param('idEvent') idEvent: number){
        const eventBeginDate = await this.eventsService.getEventBeginDateById(idEvent);
        return eventBeginDate;
    }

    @Get('/get/:idEvent/endDate')
    async getEventEndDateById(@Param('idEvent') idEvent: number){
        const eventEndDate = await this.eventsService.getEventEndDateById(idEvent);
        return eventEndDate;
    }

    @Get('/get/:idEvent/status')
    async getEventStatusById(@Param('idEvent') idEvent: number){
        const eventStatus = await this.eventsService.getEventStatusById(idEvent);
        return eventStatus;
    }

    //for testing mostly, prbly gonna work somehow in tandem to get THE Name (in service)
    //не работает??
    @Get('/get/typeUnit/:idUnit')
    async getUnitTypeUnit(@Param('idUnit') idUnit: number){
        const typeUnit = this.eventsService.getUnitTypeUnit(idUnit);
        return typeUnit;
    }
/* 
    @Get('/get/typeOrders')
    async getTypeOrders(){
        return this.eventsService.getTypeOrders();
    } */


    @Put('/delete/:idEvent')
    async deleteEventById(@Param('idEvent') idEvent: number){
        return this.eventsService.deleteEventById(idEvent);
    }

    //добавлен idEvent в путь
    @Put('/update/:idEvent')
    upadateEvent(@Param('idEvent') idEvent: number, @Body() eventDto: CreateEventDTO): Observable<any> {
        return this.eventsService.upadateEvent(Number(idEvent), eventDto);
    }
    
}
