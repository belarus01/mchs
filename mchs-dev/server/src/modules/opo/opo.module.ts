import { Module } from '@nestjs/common';
import { OpoService } from './opo.service';
import { OpoController } from './opo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOpo } from './entity/opo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SOpo],'mchs_connection')],
  providers: [OpoService],
  controllers: [OpoController]
})
export class OpoModule {}
