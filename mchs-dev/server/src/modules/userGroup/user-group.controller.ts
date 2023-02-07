import { Body, Controller, Get, Param } from "@nestjs/common";
import { UserGroupService } from "./user-group.service";

@Controller('user_group')
export class UserGroupController {
    constructor(private userGroupService: UserGroupService){}

    @Get('/get/all_users_in_group/:idGroup')
    async getAllUsersInGroupByGrId(@Param('idGroup') idGroup: number){
        const users = this.userGroupService.getAllUsersInGroupByGrId(idGroup);
        return users;
    }
}