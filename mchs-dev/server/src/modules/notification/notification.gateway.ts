import { UseGuards } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { EMPTY } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { RolesGuard } from '../auth/roles.guard';
import { WS_NOTIFICATION_EVENTS } from './notification.constants';
import { NotificationService } from './notification.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
 })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
 
  @WebSocketServer() server: Server;
  
/*   @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
    this.server.emit('sendMessageToClient', payload);
  } */

  @SubscribeMessage(WS_NOTIFICATION_EVENTS.NEW)
  async onNewNotification(@MessageBody() body: any, client: Socket){
    this.server.emit('onNotification', {
      msg: 'New Notification',
      content: body
    })
    console.log(body);
  }

  @SubscribeMessage(WS_NOTIFICATION_EVENTS.UNSENT)
  async handleUnsentNotifications(){
    
  }

  @UseGuards(RolesGuard)
  @SubscribeMessage(WS_NOTIFICATION_EVENTS.DONE) 
  async handleClosedEvent(){//(в s_events_order) | или там про task they mean?

  }

  @UseGuards(RolesGuard)
  @SubscribeMessage(WS_NOTIFICATION_EVENTS.CHANGED) 
  async handleChangedPlan(){}

  @UseGuards(RolesGuard)
  @SubscribeMessage(WS_NOTIFICATION_EVENTS.EMPTY) 
  async handleEmptyPlan(){}

  
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
}
