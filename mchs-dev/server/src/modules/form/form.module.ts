import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SForm } from './entity/form.entity';
import { SFormBuild } from './entity/formBuild.entity';
import { SFormBuild1 } from './entity/formBuild1.entity';
import { SFormBuild2 } from './entity/formbuild2.entity';
import { SFormBuildData } from './entity/formBuildData.entity';
import { SFormReport } from './entity/formReport.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    SForm,
    SFormBuild, 
    SFormBuild1,
    SFormBuild2,
    SFormBuildData,
    SFormReport
  ], 'mchs_connection'),],
  providers: [FormService],
  exports: [FormService],
  controllers: [FormController]
})
export class FormModule {}
