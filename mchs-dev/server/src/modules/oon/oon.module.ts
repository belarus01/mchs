import { Module } from '@nestjs/common';
import { OonService } from './oon.service';
import { OonController } from './oon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOon } from './entity/oon.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SOon],'doc_connection')],
  providers: [OonService],
  controllers: [OonController]
})
export class OonModule {}
