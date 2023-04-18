import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateGroupDTO } from './dto/create-group.dto';
import { DeleteGroupDTO } from './dto/delete-group.dto';
import { GroupService } from './group.service';
import { Order, Pagination } from 'src/utils/utils';
import { CreateUserGroupDTO } from './dto/create_userGroup.dto';
import { Group } from './group.entity';

@Controller('group')
export class GroupController {
    constructor(private groupService: GroupService){}

    @Get('/get/name/:idGroup')
    async getGroupNameById(@Param('idGroup') idGroup: number){
        const groupName = this.groupService.getGroupNameById(idGroup);
        return groupName;
    }

    @Get('/get/:idGroup')
    async getGroupById(@Param('idGroup') idGroup: number){
        const group = this.groupService.getGroupById(idGroup);
        return group;
    }

    @Get('get/all/sorted/by/page')
    async getAllDeptsSortAndPage(@Query() params: Order, @Query() params2: Pagination){
        const {field, order} = params;
        const {current, pageSize, total} = params2;
        return this.groupService.getAllGroupsSortAndPage(field, order, current, pageSize, total);
    }
    
    @Post('/create')
    async createGroup(@Body() dto: CreateGroupDTO){
        return this.groupService.createGroup(dto);
    }

    @Post('/create/userGroup')
    async createUserGroup(@Body() dto: CreateUserGroupDTO){
        return this.groupService.createUserGroup(dto);
    }

    @Post('/create/smth')
    async createB(@Body() groupDto: CreateGroupDTO, userGroupDto: CreateUserGroupDTO){
        return this.groupService.createB(groupDto, userGroupDto);
    }

    @Put('/block')
    blockGroup(@Body() dto: DeleteGroupDTO){
        return this.groupService.blockGroupById(dto.idGroup);
    }

    @Put('/delete')
    deleteGroup(@Body() dto: DeleteGroupDTO){
        return this.groupService.deleteGroup(dto);
    }
}
