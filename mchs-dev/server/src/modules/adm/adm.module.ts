import { Module } from '@nestjs/common';
import { AdmService } from './adm.service';
import { AdmController } from './adm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAdmBan } from './entity/admBan.entity';
import { SAdmForce } from './entity/admForce.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SAdmBan, SAdmForce],'mchs_connection')],
  providers: [AdmService],
  controllers: [AdmController]
})
export class AdmModule {}
