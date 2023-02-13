import { Controller, Get, Post, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService){}

    @Post('/create')
    async createNotification(){}

    @Get('/get/id/:')
    async getNotificationById(){}

    @Get('get/all')
    async getAllNotifications(){}

    @Put('/update')
    async updateNotification(){}

    @Put('/delete/:')
    async deleteNotificationById(){}
}
