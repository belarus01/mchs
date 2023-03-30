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
            try{
                return this.eventsRepository.save(event);
            } catch(error){
                console.log(error);
                /* if(error.code ===''){//вставить код ошибки когда выяснишь, после консоле.лог (код ошибки же не измениться?...) | + @Unique не забудь раскомментить в entity, + synchronize:true
                    throw new EventBadRequestException(`Мероприятие id = ${event.idEvent} уже создано`);
                } else{ 
                    throw new //EventServerException();
                } */
            }
            
    }

//не работает
    async createE(eventDto:CreateEventDTO){
        const event = this.eventsRepository.create(eventDto);
        if(await this.isExistedEvent(event) === true){
            throw new EventBadRequestException(`Мероприятие id = ${event.idEvent} уже создано`); 
        }else{ return this.eventsRepository.save(event);}
    }

    async isExistedEvent(eventDto:CreateEventDTO){
        const exists = await this.eventsRepository.find({where:{
            event: eventDto.event
        }});
        if(exists){
            return true;
        }
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

    async getEventsByUserId(uid: number){
        const events = await this.eventsOrderRepository.manager.query(`SELECT
        e.id_event,e.id_event_order,ss.event title,p.name_event private,DATE_FORMAT(DATE(e.date_begin), "%d.%m.%Y") start,
        e.date_end end,e.date_begin_fact b_fact,e.date_end_fact e_fact,e.date_stop d_stop,e.date_continue d_cont
      FROM mchs.s_events_order e
      left JOIN mchs.s_events ss ON ss.id_event=e.id_event
      
      left JOIN mchs.group g ON e.id_group=g.id_group
      left JOIN mchs.user_group ug ON ug.id_group=g.id_group
      left JOIN mchs.users u ON u.uid=ug.uid_gr
      LEFT JOIN mchs.s_events_private p ON p.uid=u.uid AND p.id_event_order=e.id_event_order
      WHERE u.uid=1 #GROUP BY e.id_event_order  
      union
      SELECT
        null,p.id_event_order,null,p.name_event private,DATE_FORMAT(DATE(p.date_begin), "%d.%m.%Y") beg,
        p.date_end en,null b_fact,null e_fact,null d_stop,null d_cont
      FROM mchs.s_events_private p
      #left JOIN mchs.s_events ss ON ss.id_event=e.id_event
      
      #left JOIN mchs.group g ON e.id_group=g.id_group
      #left JOIN mchs.user_group ug ON ug.id_group=g.id_group
      left JOIN mchs.users u ON u.uid=p.uid
      #LEFT JOIN mchs.s_events_order e ON p.uid=u.uid AND p.id_event_order=e.id_event_order
      WHERE u.uid=1 and p.id_event_order IS NULL #ORDER BY p.date_begin`);
      console.log(events);
      return events;
    }

/*     async getUnitTypeUnit(idUnit: number): Promise<SEventsOrder[]>{
        const typeUnits = await this.eventsOrderRepository.find({where:{
            idUnit: idUnit
        },relations:{
            units:true,
        }});
        return typeUnits;
    } */

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

//исправлен Серым delete
    async deleteEventById(idEvent: number){
        // const eventToDelete = await this.getEventById(idEvent);
        // return eventToDelete.active === 0;
        const result = await this.eventsRepository.update(idEvent, {active:0});
        return result;
    }

    //не работает
    //RangeError: Invalid status code: undefined
/*     upadateEvent(idEvent:number, eventDto: CreateEventDTO): Observable<any>{
        return from(this.eventsRepository.update(idEvent, eventDto)).pipe(
            switchMap(() => this.getEventById(idEvent))
        );
    } */

    async updateEvent(idEvent:number, eventDto: CreateEventDTO){
        return this.eventsRepository.update(idEvent,eventDto);
    }

    public async send(): Promise<void> {
        
        console.log('Notification sent');
      }

}
