import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreatePermissionDTO } from './create-permission.dto';
import { DeletePermissionDTO } from './dto/delete-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
    constructor(private permissionService: PermissionService){}

    @Post('/create')
    async createPermission(@Body() dto: CreatePermissionDTO){
        return this.permissionService.createPermission(dto);
    }

    @Get('/get/id/:idPerm')
    async getPermissionById(@Param('idPerm') idPerm: number){
        const permission = await this.permissionService.getPermissionById(idPerm);
        if(!permission) throw new NotFoundException('Permission does not exist');
        return permission;
    }

    @Get('get/all')
    async getAllPermissions(){
        return this.permissionService.getAllPermissions();
    }

    @Put('/update')
    async updatePermission(@Param('idParam') idParam: number, @Body() dto: CreatePermissionDTO) {
        return this.permissionService.updatePermission(Number(idParam), dto);
    }

    @Put('/delete')
    async deletePermission(@Body() deletePermissionDTO: DeletePermissionDTO){
        return this.permissionService.deletePermission(deletePermissionDTO);
    }
}
