import { Module } from '@nestjs/common';
import { TnpaService } from './tnpa.service';
import { TnpaController } from './tnpa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { STnpaList } from './entity/tnpaList.entity';

@Module({
  imports:[TypeOrmModule.forFeature([STnpaList],'mchs_connection')],
  providers: [TnpaService],
  controllers: [TnpaController]
})
export class TnpaModule {}
