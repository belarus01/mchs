import { Logger } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({})

export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NotificationGateway');//продумать над логгированим в свой файл /создать новый файл по типу error.log, api.log...

    @SubscribeMessage('msgToServer')//слушаем события с именем переданным в ()
    handleMessage(client: Socket, payload: string): void{
        this.server.emit('msgToClient', payload);// отправляем данные всем пользователям, подключенным к серверу
    }

    afterInit(server: Server) {
        this.logger.log('Init');
        //throw new Error("Method not implemented.");
    }

    handleConnection(client: Socket, ...args: any[]) {
       // this.logger.log(`User connected: ${}`);//${user.uid}
    }
    
    handleDisconnect(client: Socket) {
       // this.logger.log(`User disconnected: ${}`);
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any){}
    
}