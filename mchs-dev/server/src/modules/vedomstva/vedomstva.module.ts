import { Module } from '@nestjs/common';
import { VedomstvaService } from './vedomstva.service';
import { VedomstvaController } from './vedomstva.controller';
import { SVedomstva } from './vedomstva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SVedomstva],'mchs_connection')],
  providers: [VedomstvaService],
  controllers: [VedomstvaController]
})
export class VedomstvaModule {}
