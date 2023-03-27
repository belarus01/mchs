import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SPermissions } from './entity/permission.entity';
import { UserPermissions } from './entity/userPermission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SPermissions, UserPermissions], 'mchs_connection')],
  providers: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule {}
