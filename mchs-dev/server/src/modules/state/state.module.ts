import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { SState } from './state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SState],'doc_connection')],
  providers: [StateService],
  controllers: [StateController]
})
export class StateModule {}
