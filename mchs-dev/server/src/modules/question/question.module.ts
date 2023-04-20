import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SQuestion } from './entity/question.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SQuestion],'mchs_connection')],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
