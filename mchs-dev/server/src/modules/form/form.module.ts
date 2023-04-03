import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SForm } from './entity/form.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SForm], 'doc_connection'),],
  providers: [FormService],
  controllers: [FormController]
})
export class FormModule {}
