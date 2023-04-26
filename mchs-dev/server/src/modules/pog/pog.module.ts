import { Module } from '@nestjs/common';
import { PogService } from './pog.service';
import { PogController } from './pog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SPogSubjAccidents } from './entity/pogSubjAccident.entity';
import { SPogSubjAuto } from './entity/pogSubjAuto.entity';
import { SPogSubjAvia } from './entity/pogSubjAvia.entity';
import { SPogSubjRw } from './entity/pogSubjRw.entity';
import { SPogSubjWater } from './entity/pogSubjWater.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SPogSubjAccidents, SPogSubjAuto, SPogSubjAvia, SPogSubjRw, SPogSubjWater],'mchs_connection')],
  providers: [PogService],
  controllers: [PogController]
})
export class PogModule {}
