import { Module } from '@nestjs/common';
import { PooService } from './poo.service';
import { PooController } from './poo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SPoo } from './entity/poo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SPoo],'doc_connection')],
  providers: [PooService],
  controllers: [PooController]
})
export class PooModule {}
