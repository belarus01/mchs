import { Module } from '@nestjs/common';
import { SopbService } from './sopb.service';
import { SopbController } from './sopb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SSopb } from './entity/sopb.entity';
import { SSopbCard } from './entity/sopbCard.entity';
import { SSopbCardSubj } from './entity/sopbCardSubj.entity';
import { SSopbCardSubjState } from './entity/sopbCardSubjState.entity';
import { SSopbCardUid } from './entity/sopbCardUid.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SSopb, 
    SSopbCard, 
    SSopbCardSubj,
    SSopbCardSubjState,
    SSopbCardUid 
  ],'mchs_connection')],
  providers: [SopbService],
  controllers: [SopbController]
})
export class SopbModule {}
