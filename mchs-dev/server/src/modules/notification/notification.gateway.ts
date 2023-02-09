import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway()
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private notificationService: NotificationService) {}
 
  @WebSocketServer() server: Server;
  
  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {
   
  }
  
  afterInit(server: Server) {
    console.log(server);
    
  }
  
  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
   
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    
  }
}
