import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { DeleteNotificationDTO } from './dto/delete-notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
    constructor(@InjectRepository(Notification, 'mchs_connection') private notificationRepository: Repository<Notification>){}
    
    async createNotification(dto: CreateNotificationDTO): Promise<Notification>{
        const notification = this.notificationRepository.create(dto);
        return this.notificationRepository.save(notification);
    }

    async getNotificationById(id: number): Promise<Notification>{
        const notification  = await this.notificationRepository.findOneBy({id});
        return notification; 
    }

    async getAllNotifications(): Promise<Notification[]>{
        const notifications = await this.notificationRepository.find();
        return notifications;
    }

    async getAllUnsentNotifications(): Promise<Notification[]>{
        const notifications = await this.notificationRepository.find({where: {
            status: 0
        }});
        return notifications;
    }

    async updateNotification(id: number, dto: CreateNotificationDTO){
        const notification = await this.notificationRepository.update(id, {status: 2, date: new Date(Date.now()), uid: dto.uid});
        return notification;
    }

    async deleteNotification(dto: DeleteNotificationDTO){
        const notification = this.notificationRepository.update({id: dto.id}, {status: 5, date: new Date(Date.now()), uid: dto.uid});
        return notification;
    }
}
