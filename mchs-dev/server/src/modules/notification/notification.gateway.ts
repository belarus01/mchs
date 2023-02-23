import { UseGuards } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { EMPTY } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { RolesGuard } from '../auth/roles.guard';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { WS_NOTIFICATION_EVENTS } from './notification.constants';
import { NotificationService } from './notification.service';

@WebSocketGateway({
/*   pingTimeout: 2000,
  pingInterval: 2000, */
  cors: {
    origin: '*',
  },
 })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private notificationService: NotificationService) {}
 
  @WebSocketServer() server: Server;
  
  
/*   @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    this.server.emit('sendMessageToClient', payload);
  } */

  //метод чисто на поиграться потетстить как сокет работает
  @SubscribeMessage('newNotification')
  async onNewNotification(@MessageBody() body: any){
    this.server.emit('onNotification', {
      msg: 'New Notification',
      content: body
    })
    console.log(body);
  }

  @SubscribeMessage(WS_NOTIFICATION_EVENTS.NEW)
  async onNewNotifications(client: Socket, user: CreateNotificationDTO){
    if(client.connected === true){
        const notifications = await this.notificationService.getUserNotificationsByStatus(user.toUid, 1);
        notifications.forEach(notification => {
          this.server.emit('onNew', notification);
        });   
    }else{
        return this.handleUnsentNotifications(user);
    }
  }

  @SubscribeMessage(WS_NOTIFICATION_EVENTS.UNSENT)
  async handleUnsentNotifications(user: CreateNotificationDTO){
    //для начала криэйтнуть как UNSENT нотификейшн, чтоб из другого статуса установился статус UNSENT
    const unsentNotification = await this.notificationService.createUnsentNotification(user);
    const notifications = await this.notificationService.getUserNotificationsByStatus(unsentNotification.toUid, 0);
    notifications.forEach(notification => {
      this.server.emit('onUnsent', notification); //this.server.emit(WS_NOTIFICATION_EVENTS.UNSENT, notifications);
    }); 
  }

@SubscribeMessage(WS_NOTIFICATION_EVENTS.UPDATED)
async handleUpdatedNotifications(client: Socket, user: CreateNotificationDTO){
  if(client.connected){
    const updatedNotification = await this.notificationService.getUserNotificationsByStatus(user.toUid, 2);
    updatedNotification.forEach(notification => {
      this.server.emit('onUpdate', notification);}
    )}else{
      return this.handleUnsentNotifications(user);
    } 
}

  @SubscribeMessage(WS_NOTIFICATION_EVENTS.DELETED)
  async handleDeletedNotifications(client: Socket, user: CreateNotificationDTO){
    if(client.connected === true){
      const deletedNotifications = await this.notificationService.getUserNotificationsByStatus(user.toUid, 3);
      deletedNotifications.forEach(notification => {
        this.server.emit('onDelete', notification);
      });   
    }else{
      return this.handleUnsentNotifications(user);
    }   
  }

  

  //?на изменеие пароля с отправкой сообщения на email, и мб тогда отдельный user.gateway создать

  
  afterInit(server: Server) {
    console.log(server); 
  }
  
  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    /* this.server.on('connection',(clients) => {
      console.log(`Connected ${client.id}`);
    }) */
  }

  /**
     * Adds a timeout in milliseconds for the next operation.
     *
     * @example
     * io.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @param timeout
     */
}
