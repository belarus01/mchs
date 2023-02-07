import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskData } from './entity/taskData.entity';
import { TaskPeriodType } from './entity/taskPeriodType.entity';
import { TaskResult } from './entity/taskResult.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([TaskData, TaskPeriodType, TaskResult], 'mchs_connection')],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
