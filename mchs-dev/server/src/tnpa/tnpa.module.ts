import { Module } from '@nestjs/common';
import { TnpaService } from './tnpa.service';
import { TnpaController } from './tnpa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { STnpaList } from './entity/tnpaList.entity';
import { STnpaDoc } from './entity/tnpaDoc.entity';
import { STnpaStrElem } from './entity/tnpaStrElem.entity';

@Module({
  imports:[TypeOrmModule.forFeature([STnpaList, STnpaDoc, STnpaStrElem],'mchs_connection')],
  providers: [TnpaService],
  controllers: [TnpaController]
})
export class TnpaModule {}
