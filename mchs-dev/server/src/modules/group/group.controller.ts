import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateGroupDTO } from './dto/create-group.dto';
import { DeleteGroupDTO } from './dto/delete-group.dto';
import { GroupService } from './group.service';

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

    @Post('/create')
    async createGroup(@Body() dto: CreateGroupDTO){
        return this.groupService.createGroup(dto);
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
