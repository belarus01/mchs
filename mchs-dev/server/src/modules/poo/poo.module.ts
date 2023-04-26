import { Module } from '@nestjs/common';
import { PooService } from './poo.service';
import { PooController } from './poo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SPoo } from './entity/poo.entity';
import { SPooSubjPb } from './entity/pooSubjPb.entity';
import { SPooDocs } from './entity/pooDocs.entitty';

@Module({
  imports:[TypeOrmModule.forFeature([SPoo, SPooSubjPb, SPooDocs],'mchs_connection')],
  providers: [PooService],
  controllers: [PooController]
})
export class PooModule {}
