import { Module } from '@nestjs/common';
import { FireService } from './fire.service';
import { FireController } from './fire.controller';

@Module({
  providers: [FireService],
  controllers: [FireController]
})
export class FireModule {}
