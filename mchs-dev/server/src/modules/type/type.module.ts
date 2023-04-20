import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { STypeTest } from './entity/typeTest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([STypeTest],'mchs_connection')],
  providers: [TypeService],
  controllers: [TypeController]
})
export class TypeModule {}
