import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UserGroupController } from './user-group.controller';
import { UserGroup } from './user-group.entity';
import { UserGroupService } from './user-group.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserGroup], 'mchs_connection')],
  controllers: [UserGroupController],
  providers: [UserGroupService],
  exports:[UserGroupService]
})
export class UserGroupModule {}
