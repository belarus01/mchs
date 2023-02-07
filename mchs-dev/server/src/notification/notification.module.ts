import { Global, Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Global()
@Module({
  providers: [NotificationService, NotificationGateway]
})
export class NotificationModule {}
