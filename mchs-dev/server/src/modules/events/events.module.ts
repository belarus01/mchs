import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SEvents } from './entity/events.entity';
import { SEventsOrder } from './entity/eventsOrder.entity';
import { SEventsOrderData } from './entity/eventsOrderData.entity';
import { SEventsPrivate } from './entity/eventsPrivate.entity';


@Module({
  imports:[TypeOrmModule.forFeature([SEvents, SEventsOrder, SEventsOrderData, SEventsPrivate], 'mchs_connection'),],
  providers: [EventsService, ],
  exports: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
