import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SEvents } from './entity/events.entity';
import { SEventsOrder } from './entity/eventsOrder.entity';
import { SEventsOrderData } from './entity/eventsOrderData.entity';
import { SEventsPrivate } from './entity/eventsPrivate.entity';
import { SEventsDef } from './entity/eventsDef.entity';
import { SEventsOrderAdmBan } from './entity/eventsOrderAdmBan.entity';
import { SEventsOrderAdmForce } from './entity/eventsOrderAdmForce.entity';
import { SEventsOrderDef } from './entity/eventsOrderDef.entity';
import { SEventsOrderDefMtx } from './entity/eventsOrderDefMtx.entity';
import { SEventsOrderObj } from './entity/eventsOrderObj.entity';
import { SEventsOrderQue } from './entity/eventsOrderQue.entity';
import { SEventsQue } from './entity/eventsQue.entity';
import { SEventsPlan } from './entity/eventsPlan.entity';
import { SEventsOrderQueDef } from './entity/eventsOrderQueDef.entity';
import { SEventsOrderPoo } from './entity/eventsOrderPoo.entity';
import { EventCardService } from './eventCard.service';
import { EventCardController } from './eventCard.controller';


@Module({
  imports:[TypeOrmModule.forFeature([
    SEvents, 
    SEventsOrder,
    SEventsOrderData, 
    SEventsPrivate, 
    SEventsDef, 
    SEventsOrderAdmBan,
    SEventsOrderAdmForce,
    SEventsOrderDef,
    SEventsOrderDefMtx,
    SEventsOrderObj,
    SEventsOrderQue,
    SEventsQue,
    SEventsOrderQueDef,
    SEventsPlan,
    SEventsOrderPoo
  ], 'mchs_connection'),],
  providers: [EventsService, EventCardService ],
  exports: [EventsService, EventCardService],
  controllers: [EventsController, EventCardController]
})
export class EventsModule {}
