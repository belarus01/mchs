import { Module } from '@nestjs/common';
import { JobTitleService } from './jobTitle.service';
import { JobController } from './jobTitle.controller';
import { SDeptJob } from './jobTitle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SDeptJob], 'mchs_connection')],
  providers: [JobTitleService],
  controllers: [JobController]
})
export class JobTitleModule {}
