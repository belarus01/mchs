import { Module } from '@nestjs/common';
import { DefectionService } from './defection.service';
import { DefectionController } from './defection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SDefection } from './entity/defection.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SDefection], 'mchs_connection'),],
  providers: [DefectionService],
  controllers: [DefectionController]
})
export class DefectionModule {}
