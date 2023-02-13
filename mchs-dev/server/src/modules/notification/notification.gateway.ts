import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
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

  @SubscribeMessage('newNotification')
  async onNewNotification(@MessageBody() body: any){
    this.server.emit('onNotification', {
      msg: 'New Notification',
      content: body
    })
    console.log(body);
  }
  
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
