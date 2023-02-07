import { Module } from '@nestjs/common';
import { SopbService } from './sopb.service';
import { SopbController } from './sopb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SSopb } from './entity/sopb.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SSopb],'doc_connection')],
  providers: [SopbService],
  controllers: [SopbController]
})
export class SopbModule {}
