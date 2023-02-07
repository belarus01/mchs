import {
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { NestJsNotificationChannel } from 'nestjs-notifications';
import { NotificationServerException } from '../exception/notification.server.exception';
import { HttpNotification } from '../interface/http.notification.interface';
  
  @Injectable()
  export class HttpChannel implements NestJsNotificationChannel {
    constructor(private readonly httpService: HttpService) {}
  
    /**
     * Send the given notification
     * @param notification
     */
    public async send(
      notification: HttpNotification, // или NestJsNotification...
    ): Promise<any> {
      const message = this.getData(notification);
      return this.httpService.post(notification.httpUrl(), message).toPromise();
    }
  
    /**
     * Get the data for the notification.
     * @param notification
     */
    getData(notification: HttpNotification) {
      if (typeof notification.toHttp === 'function') {
        return notification.toHttp();
      }
  
      if (typeof notification.toPayload === 'function') {
        return notification.toPayload();
      }
  
      /* throw new InternalServerErrorException(
        'Notification is missing toPayload method.',
      ); */

      throw new NotificationServerException(
        'Notification is missing toPayload method.',
      );
    }
  }
  