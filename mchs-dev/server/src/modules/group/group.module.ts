import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroup } from './entity/userGroup.entity';
import { GarbageService } from './garbage.service';

@Module({
  imports:[TypeOrmModule.forFeature([Group,UserGroup], 'mchs_connection')],

  providers: [GroupService, GarbageService],
  controllers: [GroupController]
})
export class GroupModule {}
