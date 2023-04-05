import { Controller, Post, Body, Get, Put, Delete, Param, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateEventDTO } from './dto/create-event.dto';
import { GetNowDTO } from './dto/getNow.dto';
import { SEvents } from './entity/events.entity';
import { EventsService } from './events.service';
import { CreateEventQueDTO } from './dto/create-eventQue.dto';
import { CreateEventDefDTO } from './dto/create-eventDef.dto';


@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService){}

    @Post('/create')
    createEvent(@Body() eventDto: CreateEventDTO){
        return this.eventsService.createEvent(eventDto);
    }

    @Post('/create/eventDef')
    async createEventDef(@Body() dto: CreateEventDefDTO){
        return this.eventsService.createEventDef(dto);
    }

    @Post('/create/eventQue')
    async createEventQue(@Body() dto: CreateEventQueDTO){
        return this.eventsService.createEventQue(dto);
    }

    @Post('/send')
    sendNotification(){
        return this.eventsService.send();
    }

    @Get('/get/all')
    async getAllEvents(){
        return this.eventsService.getAllEvents();
    }

    @Get('/get/all/eventDefs')
    async getAllEventDefs(){
        return this.eventsService.getAllEventDefs();
    }

    @Get('/get/all/eventQues')
    async getAllEventQues(){
        return this.eventsService.getAllEventQues();
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
        return event;
    }

    @Get('/get/id/eventDef/:idList')
    async getEventDefById(@Param('idList') idList: number){
        return this.eventsService.getEventDefById(idList);
    }

    @Get('/get/id/eventQue/:idList')
    async getEventQueById(@Param('idList') idList: number){
        return this.eventsService.getEventQueById(idList);
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
    //заработает если каким-то образом в тайпормных сущностях 
    //либо воспримутся связи (mchs.s_events_order - doc.s_unit) написанные ручками(или правильнее напишутся то что помечено ///added)
    //либо в самой бд корректно настороятся их взаимосявязи и при генерации сущностей эта взамосвязь появится
/*     @Get('/get/typeUnit/:idUnit')
    async getUnitTypeUnit(@Param('idUnit') idUnit: number){
        const typeUnits = this.eventsService.getUnitTypeUnit(idUnit);
        return typeUnits;
    } */
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
    /* @Put('/update/:idEvent')
    upadateEvent(@Param('idEvent') idEvent: number, @Body() eventDto: CreateEventDTO): Observable<any> {
        return this.eventsService.upadateEvent(Number(idEvent), eventDto);
    } */

    @Put('/update/:idEvent')
    async updateEvent(@Param('idEvent') idEvent: number, @Body() eventDto: CreateEventDTO){
        return this.eventsService.updateEvent(idEvent, eventDto);
    }

    @Put('/update/eventDef/:idList')
    async updateEventDef(idList: number, dto: CreateEventDefDTO){
        return this.eventsService.updateEventDef(idList, dto);
    }

    @Put('/update/eventQue/:idList')
    async updateEventQue(idList: number, dto: CreateEventQueDTO){
        return this.eventsService.updateEventQue(idList, dto);
    }

    @Put('/delete/eventDef/:idList')
    async deleteEventDefById(idList: number){
        return this.eventsService.deleteEventDefById(idList);
    }

    @Put('/delete/eventQue/:idList')
    async deleteEventQueById(idList: number){
        return this.eventsService.deleteEventQueById(idList);
    }
    

    @Get('/get/all/userId=:uid')
    async getAllByUid(@Param('uid') uid:number){
        return this.eventsService.getEventsByUserId(uid);
    }
}
