import { Module } from '@nestjs/common';
import { AteService } from './ate.service';
import { AteController } from './ate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAteCateg } from './entity/ateCateg.entity';
import { SAteObl } from './entity/ateObl.entity';
import { SAteRayon } from './entity/ateRayon.entity';
import { SAteReestr } from './entity/ateReestr.entity';
import { SAteStreet } from './entity/ateStreet.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SAteCateg, SAteObl, SAteRayon, SAteReestr, SAteStreet], 'mchs_connection')],
  providers: [AteService],
  controllers: [AteController],
  exports:[AteService]
})

export class AteModule {}
