import { Type } from '@nestjs/common';
import { NestJsNotificationChannel, NestJsNotification } from 'nestjs-notifications';
import { CustomHttpChannel } from '../channel/custom.http.channel';
import { HttpChannel } from '../channel/htttp.channel'; // или все-таки заимпорти из 'nestjs-notifications'...



export class ExampleNotification implements NestJsNotification {

  /**
   * Data passed into the notification to be used when
   * constructing the different payloads
   */
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  /**
   * Get the channels the notification should broadcast on
   * @returns {Type<NestJsNotificationChannel>[]} array
   */
  public broadcastOn(): Type<NestJsNotificationChannel>[] {
    return [
      HttpChannel,
      CustomHttpChannel,
      /* CustomChannel,
      EmailChannel */
    ];
  }

  toHttp() {}

  toCustom() { }

  toEmail() { }

  /**
   * Get the json representation of the notification.
   * @returns {}
   */
  toPayload(): any {
    return this.data;
  }
}