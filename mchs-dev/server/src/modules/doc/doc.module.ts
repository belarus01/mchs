import { Module } from '@nestjs/common';
import { UnitModule } from '../unit/unit.module';

@Module({
  imports: [UnitModule],
  exports:[UnitModule]
})
export class DocModule {}
