import { Module } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SSubjObj } from './object.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SSubjObj], 'mchs_connection')],
  providers: [ObjectService],
  controllers: [ObjectController]
})
export class ObjectModule {}
