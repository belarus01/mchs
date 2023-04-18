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
import { SEventsQue } from './entity/eventsQue.entity';
import { SEventsDef } from './entity/eventsDef.entity';
import { CreateEventDefDTO } from './dto/create-eventDef.dto';
import { CreateEventQueDTO } from './dto/create-eventQue.dto';
import { skipPage, sortByField } from 'src/utils/utils';
import { CreateEventOrderDTO } from './dto/create-eventOrder';
import { CreateEventOrderAdmForceDTO } from './dto/create-eventOrderAdmForce.dto';
import { SEventsOrderAdmForce } from './entity/eventsOrderAdmForce.entity';
import { SEventsOrderAdmBan } from './entity/eventsOrderAdmBan.entity';
import { CreateEventOrderAdmBanDTO } from './dto/create-eventOrderAdmBan.dto';



@Injectable()
export class EventsService {
    constructor(@InjectRepository(SEvents, 'mchs_connection') private eventsRepository: Repository<SEvents>,
    @InjectRepository(SEventsOrder, 'mchs_connection') private eventsOrderRepository: Repository<SEventsOrder>,
    @InjectRepository(SEventsQue, 'mchs_connection') private eventsQueRepository: Repository<SEventsQue>,
    @InjectRepository(SEventsDef, 'mchs_connection') private eventsDefRepository: Repository<SEventsDef>,
    @InjectRepository(SEventsOrderAdmForce, 'mchs_connection') private eventsOrderAdmForceRepository: Repository<SEventsOrderAdmForce>,
    @InjectRepository(SEventsOrderAdmBan, 'mchs_connection') private eventsOrderAdmBanRepository: Repository<SEventsOrderAdmBan>
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

    async createEventOrder(dto: CreateEventOrderDTO){
        const event = this.eventsOrderRepository.create(dto);
        return this.eventsOrderRepository.save(event);
    }

    async createEventDef(dto: CreateEventDefDTO){
        const event = this.eventsDefRepository.create(dto);
        return this.eventsDefRepository.save(event);
    }

    async createEventQue(dto: CreateEventQueDTO){
        const event = this.eventsQueRepository.create(dto);
        return this.eventsDefRepository.save(event);
    }

    async createEventOrderAdmForce(dto: CreateEventOrderAdmForceDTO){
        const event = this.eventsOrderAdmForceRepository.create(dto);
        return this.eventsOrderAdmForceRepository.save(event);
    }

    async createEventOrderAdmBan(dto: CreateEventOrderAdmBanDTO){
        const event = this.eventsOrderAdmBanRepository.create(dto);
        return this.eventsOrderAdmBanRepository.save(event);
    }

    async getAllEvents(): Promise<SEvents[]>{
        const events = await this.eventsRepository.find({where: {
            active:1
        }});
        return events;
    }

    async getAllEventsSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const events = (await this.eventsRepository.find({where:{active:1}}));
        const sorted = sortByField(events, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    }

    async getAllEventsOrdersSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const events = (await this.eventsOrderRepository.find({where:{active:1}}));
        const sorted = sortByField(events, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    }

    async getAllEventDefs(){
        const events = await this.eventsDefRepository.find({where: {
            active:1
        }});
        return events;
    }

    async getAllEventQues(){
        const events = await this.eventsDefRepository.find({where: {
            active:1
        }});
        return events;
    }

    async getAllEventOrderAdmForces(){
        const events = await this.eventsOrderAdmForceRepository.find({where: {
            active:1
        }});
        return events;
    }

    async getAllEventOrderAdmBans(){
        const events = await this.eventsOrderAdmBanRepository.find({where: {
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


    async getEventDefById(idList: number){
        const event = await this.eventsDefRepository.findOneBy({idList});
        if(!event){
            throw new EventNotFoundException(`Event Def id = ${idList} not found!`);
        }
        return event;
    }

    async getEventQueById(idList: number){
        const event = await this.eventsQueRepository.findOneBy({idList});
        if(!event){
            throw new EventNotFoundException(`Event Que id = ${idList} not found!`);
        }
        return event;
    }

    async getEventOrderAdmForceById(idList: number){
        const event = await this.eventsOrderAdmForceRepository.findOneBy({idList});
        if(!event){
            throw new EventNotFoundException(`Event Order Adm Force id = ${idList} not found!`);
        }
        return event;
    }

    async getEventOrderAdmBanById(idList: number){
        const event = await this.eventsOrderAdmBanRepository.findOneBy({idList});
        if(!event){
            throw new EventNotFoundException(`Event Order Adm Ban id = ${idList} not found!`);
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
        return await this.eventsRepository.update(idEvent,eventDto);
    }

    async updateEventOrder(idEventOrder: number, dto: CreateEventOrderDTO){
        return await this.eventsOrderRepository.update(idEventOrder, dto);
    }

    async updateEventDef(idList: number, dto: CreateEventDefDTO){
        return await this.eventsDefRepository.update(idList, dto);
    }

    async updateEventOrderAdmForce(idList: number, dto: CreateEventOrderAdmForceDTO){
        return await this.eventsOrderAdmForceRepository.update(idList, dto);
    }

    async updateEventOrderAdmBan(idList: number, dto: CreateEventOrderAdmBanDTO){
        return await this.eventsOrderAdmBanRepository.update(idList, dto);
    }

    async updateEventQue(idList: number, dto: CreateEventQueDTO){
        return await this.eventsDefRepository.update(idList, dto);
    }

    async deleteEventOrderById(idEventOrder: number){
        return await this.eventsOrderRepository.update(idEventOrder, {active:0});
    }

    async deleteEventDefById(idList: number){
        const result = await this.eventsDefRepository.update(idList, {active:0});
        return result;
    }

    async deleteEventQueById(idList: number){
        const result = await this.eventsDefRepository.update(idList, {active:0});
        return result;
    }

    async deleteEventOrderAdmForceById(idList: number){
        const result = await this.eventsOrderAdmForceRepository.update(idList, {active:2});
        return result;
    }

    async deleteEventOrderAdmBanById(idList: number){
        const result = await this.eventsOrderAdmBanRepository.update(idList, {active:2});
        return result;
    }

    public async send(): Promise<void> {
        
        console.log('Notification sent');
      }

    async getAllEventsBySubjectId(idSubj:number){
        const result = await this.eventsOrderRepository.find({where:{active:1, idSubj: idSubj},relations:{
            idEvent2:true, 
            idDept2:true,
        }});
        return result;
    }

}
