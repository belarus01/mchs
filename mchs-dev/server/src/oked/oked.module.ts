import { Module } from '@nestjs/common';
import { OkedService } from './oked.service';
import { OkedController } from './oked.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SOked_2 } from './entity/oked.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SOked_2],'mchs_connection')],
  providers: [OkedService],
  controllers: [OkedController]
})
export class OkedModule {}
