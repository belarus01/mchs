import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SEvents } from './entity/events.entity';
import { SEventsOrder } from './entity/eventsOrder.entity';
import { SEventsOrderData } from './entity/eventsOrderData.entity';
import { SEventsPrivate } from './entity/eventsPrivate.entity';
import { NestJsNotificationsService } from '../notification_/notification/notification.service';
import { NESTJS_NOTIFICATIONS_JOB_OPTIONS, NESTJS_NOTIFICATIONS_QUEUE } from '../notification_/constants';
import { NestJsNotificationsModule } from '../notification_/notification.module';


@Module({
  imports:[TypeOrmModule.forFeature([SEvents, SEventsOrder, SEventsOrderData, SEventsPrivate], 'mchs_connection'),],
  providers: [EventsService, 
    NestJsNotificationsService,
    {provide: NESTJS_NOTIFICATIONS_QUEUE,
    useClass: NestJsNotificationsModule},
    {provide: NESTJS_NOTIFICATIONS_JOB_OPTIONS,
      useClass: NestJsNotificationsModule}
  ],
  exports: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
