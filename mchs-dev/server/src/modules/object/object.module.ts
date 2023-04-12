import { Module } from '@nestjs/common';
import { ObjectService } from './object.service';
import { ObjectController } from './object.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SSubjObj } from './entity/object.entity';
import { SSubjObjSpecif } from './entity/objectSpecif.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SSubjObj, SSubjObjSpecif], 'mchs_connection')],
  providers: [ObjectService],
  controllers: [ObjectController]
})
export class ObjectModule {}
