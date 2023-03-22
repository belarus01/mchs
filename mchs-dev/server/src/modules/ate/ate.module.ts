import { Module } from '@nestjs/common';
import { AteService } from './ate.service';
import { AteController } from './ate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAteCateg } from 'src/entities/mchs/SAteCateg';
import { SAteObl } from 'src/entities/mchs/SAteObl';
import { SAteRayon } from 'src/entities/mchs/SAteRayon';
import { SAteReestr } from 'src/entities/mchs/SAteReestr';
import { SAteStreet } from 'src/entities/mchs/SAteStreet';

@Module({
  imports:[TypeOrmModule.forFeature([SAteCateg, SAteObl, SAteRayon, SAteReestr, SAteStreet], 'mchs_connection')],
  providers: [AteService],
  controllers: [AteController],
  exports:[AteService]
})
export class AteModule {}
