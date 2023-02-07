import { Module } from '@nestjs/common';
import { SoatoService } from './soato.service';
import { SoatoController } from './soato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SSoato } from './entity/soato.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SSoato], 'mchs_connection')],
  providers: [SoatoService],
  controllers: [SoatoController]
})
export class SoatoModule {}
