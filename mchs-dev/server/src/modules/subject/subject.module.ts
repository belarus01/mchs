import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SSubj } from './entity/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SSubj], 'mchs_connection')],
  providers: [SubjectService],
  controllers: [SubjectController]
})
export class SubjectModule {}
