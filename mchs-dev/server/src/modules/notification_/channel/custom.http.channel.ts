import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { NestJsNotification, NestJsNotificationChannel } from "nestjs-notifications";
import { HttpNotification } from "../interface/http.notification.interface";

@Injectable()
export class CustomHttpChannel implements NestJsNotificationChannel {
    constructor(private readonly httpService: HttpService){}
    
    /**
   * Send the given notification
   * @param notification
   */

    public async send(notification: HttpNotification): Promise<void> {
        const data = this.getData(notification);
        await this.httpService.post(notification.httpUrl(), data).toPromise();
    }

    getData(notification: NestJsNotification){
        return notification.toPayload();
    }


}