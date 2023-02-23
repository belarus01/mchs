import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { DeleteNotificationDTO } from './dto/delete-notification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService){}

    @Post('/create')
    async createNotification(@Body() dto: CreateNotificationDTO){
        const notififcation = await this.notificationService.createNotification(dto);
        return notififcation;
    }

    @Get('/get/id/:id')
    async getNotificationById(@Param('id') id: number){
        const notification = await this.notificationService.getNotificationById(id);
        return notification;
    }

    @Get('/get/all')
    async getAllNotifications(){
        const notifications = await this.notificationService.getAllNotifications();
        return notifications;
    }

    @Get('/get/user-status/:toUid/:status')
    async getUserNotificationsStatus(@Param('toUid') toUid: number, @Param('status') status: number){
        const notifications  = await this.notificationService.getUserNotificationsByStatus(toUid, status);
        return notifications;
    }

    @Get('/get/all/unsent')
    async getAllUnsentNotifications(){
        const notifications = await this.notificationService.getAllUnsentNotifications();
        return notifications; 
    }


    @Put('/update')
    async updateNotification(@Param('id') id: number ,@Body() dto: CreateNotificationDTO){
        return this.notificationService.updateNotification(Number(id), dto);
    }

    @Put('/delete')
    async deleteNotification(@Body() dto: DeleteNotificationDTO){
        return this.notificationService.deleteNotification(dto);
    }
}
