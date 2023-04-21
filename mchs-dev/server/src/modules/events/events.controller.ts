import { Controller, Post, Body, Get, Put, Delete, Param, Req, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateEventDTO } from './dto/create-event.dto';
import { GetNowDTO } from './dto/getNow.dto';
import { SEvents } from './entity/events.entity';
import { EventsService } from './events.service';
import { CreateEventQueDTO } from './dto/create-eventQue.dto';
import { CreateEventDefDTO } from './dto/create-eventDef.dto';
import { Order, Pagination } from 'src/utils/utils';
import { CreateEventOrderDTO } from './dto/create-eventOrder';
import { CreateEventOrderAdmForceDTO } from './dto/create-eventOrderAdmForce.dto';
import { CreateEventOrderAdmBanDTO } from './dto/create-eventOrderAdmBan.dto';
import { CreateEventPrivateDTO } from './dto/create-eventPrivate.dto';
import { CreateEventOrderQueDefDTO } from './dto/create-eventOrderQueDef.dto';


@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService){}

    @Post('/create')
    createEvent(@Body() eventDto: CreateEventDTO){
        return this.eventsService.createEvent(eventDto);
    }

    @Post('/create/eventPrivate')
    createEventPrivate(@Body() eventDto: CreateEventPrivateDTO){
        return this.eventsService.createEventPrivate(eventDto);
    }

    @Post('/create/eventOrder')
    createEventOrder(@Body() eventDto: CreateEventOrderDTO){
        return this.eventsService.createEventOrder(eventDto);
    }

    @Post('/create/eventOrderQueDef')
    createEventOrderQueDef(@Body() eventDto: CreateEventOrderQueDefDTO){
        return this.eventsService.createEventOrderQueDef(eventDto);
    }

    @Post('/create/eventDef')
    async createEventDef(@Body() dto: CreateEventDefDTO){
        return this.eventsService.createEventDef(dto);
    }

    @Post('/create/eventQue')
    async createEventQue(@Body() dto: CreateEventQueDTO){
        return this.eventsService.createEventQue(dto);
    }

    @Post('create/eventOrderAdmForce')
    async createEventOrderAdmForce(dto: CreateEventOrderAdmForceDTO){
        return this.eventsService.createEventOrderAdmForce(dto);
    }

    @Post('create/eventOrderAdmBan')
    async createEventOrderAdmBan(dto: CreateEventOrderAdmBanDTO){
        return this.eventsService.createEventOrderAdmBan(dto);
    }

    @Post('/send')
    sendNotification(){
        return this.eventsService.send();
    }

    @Get('/get/all')
    async getAllEvents(){
        return this.eventsService.getAllEvents();
    }

    @Get('/get/all/relations')
    async getAllEventsWithRelations(){
        return this.eventsService.getAllEventsWithRelations();
    }

    @Get('get/all/sorted/by/page')
    async getAllEventsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.eventsService.getAllEventsSortAndPage(field, order, current, pageSize, total);
    }

    @Get('get/all/eventsPrivate/sorted/by/page')
    async getAllEventsPrivateSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.eventsService.getAllEventsPrivateSortAndPage(field, order, current, pageSize, total);
    }

    @Get('get/all/eventsOrders/with/relations/sorted/by/page')
    async getAllEventsOrdersWithRelationsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.eventsService.getAllEventsOrdersWithRelationsSortAndPage(field, order, current, pageSize, total);
    }

    @Get('get/all/eventsOrderQueDefs/with/relations/sorted/by/page')
    async getAllEventsOrderQueDefsWithRelationsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.eventsService.getAllEventsOrderQueDefsWithRelationsSortAndPage(field, order, current, pageSize, total);
    }

    @Get('/get/all/eventDefs')
    async getAllEventDefs(){
        return this.eventsService.getAllEventDefs();
    }

    @Get('/get/all/eventOrderAdmForces')
    async getAllEventOrderAdmForces(){
        return this.eventsService.getAllEventOrderAdmForces();
    }

    @Get('/get/all/eventOrderAdmBans')
    async getAllEventOrderAdmBans(){
        return this.eventsService.getAllEventOrderAdmBans();
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

    @Get('/get/id/eventPrivate/:idEvent')
    async getEventPrivateById(@Param('idPriv') idPriv: number){
        const event = await this.eventsService.getEventPrivateById(idPriv);
        return event;
    }

    @Get('/get/id/eventOrderQueDef/:idList')
    async getEventOrderQueDefById(@Param('idList') idList: number){
        const event = await this.eventsService.getEventOrderQueDefById(idList);
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

    @Get('/get/id/eventOrderAdmForce/:idList')
    async getEventOrderAdmForceById(@Param('idList') idList: number){
        return this.eventsService.getEventOrderAdmForceById(idList);
    }

    @Get('/get/id/eventOrderAdmBan/:idList')
    async getEventOrderAdmBanById(@Param('idList') idList: number){
        return this.eventsService.getEventOrderAdmBanById(idList);
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

    //добавлен idEvent в путь
    /* @Put('/update/:idEvent')
    upadateEvent(@Param('idEvent') idEvent: number, @Body() eventDto: CreateEventDTO): Observable<any> {
        return this.eventsService.upadateEvent(Number(idEvent), eventDto);
    } */

    @Put('/update/:idEvent')
    async updateEvent(@Param('idEvent') idEvent: number, @Body() eventDto: CreateEventDTO){
        return this.eventsService.updateEvent(idEvent, eventDto);
    }

    @Put('/update/eventPrivate/:idPriv')
    async updateEventPrivate(@Param('idPriv') idPriv: number, @Body() eventDto: CreateEventPrivateDTO){
        return this.eventsService.updateEventPrivate(idPriv, eventDto);
    }

    @Put('/update/eventOrder/:idEventOrder')
    async updateEventOrder(@Param('idEventOrder') idEventOrder: number, @Body() eventDto: CreateEventOrderDTO){
        return this.eventsService.updateEventOrder(idEventOrder, eventDto);
    }

    @Put('/update/eventOrderQueDef/:idList')
    async updateEventOrderQueDef(idList: number, dto: CreateEventOrderQueDefDTO){
        return this.eventsService.updateEventOrderQueDef(idList, dto);
    }

    @Put('/update/eventOrderAdmForce/:idList')
    async updateEventOrderAdmForce(idList: number, dto: CreateEventOrderAdmForceDTO){
        return this.eventsService.updateEventOrderAdmForce(idList, dto);
    }

    @Put('/update/eventOrderAdmBan/:idList')
    async updateEventOrderAdmBan(idList: number, dto: CreateEventOrderAdmBanDTO){
        return this.eventsService.updateEventOrderAdmBan(idList, dto);
    }

    @Put('/update/eventDef/:idList')
    async updateEventDef(idList: number, dto: CreateEventDefDTO){
        return this.eventsService.updateEventDef(idList, dto);
    }

    @Put('/update/eventQue/:idList')
    async updateEventQue(idList: number, dto: CreateEventQueDTO){
        return this.eventsService.updateEventQue(idList, dto);
    }

    @Put('/delete/:idEvent')
    async deleteEventById(@Param('idEvent') idEvent: number){
        return this.eventsService.deleteEventById(idEvent);
    }

    @Delete('/delete/eventPrivate/:idPriv')//поле active отсутствует в БД
    async deleteEventPrivateById(@Param('idPriv') idPriv: number){
        return this.eventsService.deleteEventPrivateById(idPriv);
    }

    @Put('/delete/eventOrder/:idEventOrder')
    async deleteEventOrderById(@Param('idEventOrder') idEventOrder: number){
        return this.eventsService.deleteEventOrderById(idEventOrder);
    }

    @Put('/delete/eventOrderQueDef/:idList')
    async deleteEventOrderQueDefById(idList: number){
        return this.eventsService.deleteEventOrderQueDefById(idList);
    }

    @Put('/delete/eventDef/:idList')
    async deleteEventDefById(idList: number){
        return this.eventsService.deleteEventDefById(idList);
    }

    @Put('/delete/eventQue/:idList')
    async deleteEventQueById(idList: number){
        return this.eventsService.deleteEventQueById(idList);
    }
    
    @Put('/delete/eventOrderAdmForce/:idList')
    async deleteEventOrderAdmForceById(idList: number){
        return this.eventsService.deleteEventOrderAdmForceById(idList);
    }

    @Put('/delete/eventOrderAdmBan/:idList')
    async deleteEventOrderAdmBanById(idList: number){
        return this.eventsService.deleteEventOrderAdmBanById(idList);
    }

    @Get('/get/all/userId=:uid')
    async getAllByUid(@Param('uid') uid:number){
        return this.eventsService.getEventsByUserId(uid);
    }

    @Get('/get/all/subjId=:idSubj')
    async getAllEventsBySubjectId(@Param('idSubj') idSubj: number){
        return this.eventsService.getAllEventsBySubjectId(idSubj);
    }

    @Get('/get/all/eventsOrders')
    async getAllEventsOrders(){
        return this.eventsService.getAllEventsOrders();
    }
}
