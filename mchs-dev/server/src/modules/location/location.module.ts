import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './entity/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Location], 'mchs_connection')],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
