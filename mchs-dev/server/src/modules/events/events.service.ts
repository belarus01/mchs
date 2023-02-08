import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { CreateEventDTO } from './dto/create-event.dto';
import { SEvents } from './entity/events.entity';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { SEventsOrder } from './entity/eventsOrder.entity';
import { SEventsPrivate } from './entity/eventsPrivate.entity';
import * as moment from 'moment';
import { GetNowDTO } from './dto/getNow.dto';
import { ModuleRef } from '@nestjs/core';
import { channel } from 'diagnostics_channel';
import { EventNotFoundException } from './exception/event.not-found.exception';
import { EventBadRequestException } from './exception/event.bad-request.exception';



@Injectable()
export class EventsService {
    constructor(@InjectRepository(SEvents, 'mchs_connection') private eventsRepository: Repository<SEvents>,
    @InjectRepository(SEventsOrder, 'mchs_connection') private eventsOrderRepository: Repository<SEventsOrder>,
    //@InjectRepository(SEventsPrivate, 'mchs_connection') private eventsPrivateRepository: Repository<SEventsPrivate>,
    
    //private moduleRef: ModuleRef,
    ){
        
    }

    async createEvent(eventDto:CreateEventDTO): Promise<SEvents>{
        const event = this.eventsRepository.create(eventDto);
        if(event.event){
            throw new EventBadRequestException(`Мероприятие id = ${event.idEvent} уже создано`);
        }
        //if выбрасывающий 403 Exc-n (тут EventForbiddenExcepion) на то что есть ли права создания  
        return this.eventsRepository.save(event);
    }

    async getAllEvents(): Promise<SEvents[]>{
        const events = await this.eventsRepository.find({where: {
            active:1
        }});
        return events;
    }

    async getPetyaTheBest(){
        console.log(moment(new Date(Date.now())).format('YYYY-MM-DD'));
        //console.log(new Date(Date.now()));
    }

    async getAllDayEvents(dateNow: GetNowDTO): Promise<SEvents[]>{
        const dayEvents = await this.eventsRepository.find({
            where:{
                dateBegin: Between(moment(dateNow.dateNow).startOf('day').toDate(),moment(dateNow.dateNow).endOf('day').toDate()),
            }
        }); 
        if(dayEvents.length == 0){
            throw new EventNotFoundException(`Мероприятий на ${dayEvents} не запланировано.`);// проверить в каком виде даты он выведет dayEvents 
        } //?наскоько корректно писать "не запланировано", только ли из-за этого может не найти мереоприятия?     
        return dayEvents;
    }

    async getAllWeekEvents(dateNow: GetNowDTO): Promise<SEvents[]>{
        const weekEvents = await this.eventsRepository.find({
            where:{
                dateBegin: Between(moment(dateNow.dateNow).startOf('day').toDate(),moment(dateNow.dateNow).endOf('day').toDate()),
            }
        });
        if(weekEvents.length == 0){
            throw new EventNotFoundException('На этой неделе нет спланированных мероприятий.');// no events this week, мб если можно то написать так: Нет спланированных мероприятий с ${dateBegin} по ${dateEnd}(просто разбить, и в Between 2 переменные)
        }
        return weekEvents;
    }

    async getAllMonthEvents(dateNow: GetNowDTO): Promise<SEvents[]>{
        const monthEvents = await this.eventsRepository.find({where:{
            dateBegin: Between(moment(dateNow.dateNow).startOf('month').toDate(),moment(dateNow.dateNow).endOf('month').toDate()),
        }});
        if(monthEvents.length == 0){
            throw new EventNotFoundException('В этом месяце нет спланированных мероприятий.');// no month events
        }
        return monthEvents;
    }

    async getEventById(idEvent: number): Promise<SEvents>{
        const event = await this.eventsRepository.findOneBy({idEvent});
        if(!event){
            throw new EventNotFoundException(`Event id = ${idEvent} not found!`);
        }
        return event;
    }



    async getEventBeginDateById(idEvent: number){
        const eventBeginDate = (await (this.eventsRepository.findOneBy({ idEvent }))).dateBegin;
        return  eventBeginDate;
    }
    
    async getEventEndDateById(idEvent: number){
        const eventEndDate = (await (this.eventsRepository.findOneBy({ idEvent }))).dateEnd;
        return eventEndDate;
    }

    async getEventStatusById(idEvent: number){
            const eventStatus = (await this.eventsRepository.findOneBy({idEvent})).status; 
            return eventStatus;            
    }

    async getUnitTypeUnit(idEvent: number){
        const typeUnit = this.eventsOrderRepository.find(
           { where:{idEvent: idEvent},relations: {idUnit: true}} 
        );
        return typeUnit;
    }

   /*  async getTypeOrders(){
        const typeUnits = [];
        const typeUnit0 = await this.eventsOrderRepository.find({relations: {units: true}});
        typeUnit0.map((value) => {typeUnits.push(value.units.typeUnit)});
        for(let i = 0; i < typeUnits.length; i++){
            if(typeUnits[i] === 4){
                const order = [];
                return typeUnits[i].map((value: { units: { name: any; }; }) => {order.push(value.units.name)});
            }
        }
    }

    async getTypeChecks(){
        const typeUnits = [];
        const typeUnit0 = await this.eventsOrderRepository.find({relations: {units: true}});
        typeUnit0.map((value) => {typeUnits.push(value.units.typeUnit)});
        for(let i = 0; i < typeUnits.length; i++){
            if(typeUnits[i] === 3){
                const order = [];
                return typeUnits[i].map((value: { units: { name: any; }; }) => {order.push(value.units.name)});
            }
        }
    }

    async getSpheras(idUnit: number){//(не забыть! для Ч.Л.5-11 смотреть с id_parent)
        const idUnit0 = this.eventsOrderRepository.find({
            where: {idUnit: idUnit}
        });
        const order = [];
        (await idUnit0).map((value) =>{
            order.push(value.units.name);
        });
    } */


    async deleteEventById(idEvent: number){
        const eventToDelete = await this.getEventById(idEvent);
        return eventToDelete.active === 0;
    }

    upadateEvent(idEvent:number, eventDto: CreateEventDTO): Observable<any>{
        return from(this.eventsRepository.update(idEvent, eventDto)).pipe(
            switchMap(() => this.getEventById(idEvent))
        );
    }

    public async send(): Promise<void> {
        
        console.log('Notification sent');
      }

}
