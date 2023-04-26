import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { SUnits } from './unit.entity';

@Module({
    imports:[TypeOrmModule.forFeature([SUnits],'mchs_connection')],
    providers: [UnitService],
    controllers: [UnitController]
})
export class UnitModule {}
