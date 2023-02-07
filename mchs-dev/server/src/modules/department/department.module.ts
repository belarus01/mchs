import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SDept } from './entity/department.entity';
import { SDeptUnits } from './entity/departmentUnit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SDept,SDeptUnits], 'mchs_connection')],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
