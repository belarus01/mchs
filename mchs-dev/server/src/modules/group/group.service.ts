import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { UserGroup } from "./entity/userGroup.entity";
import { Repository, createQueryBuilder } from "typeorm";
import { GroupNotFoundException } from "./exception/group.not-found.exception";
import { Pagination, skipPage, sortByField } from "src/utils/utils";
import { DeptNotFoundException } from "../department/exception/dept.not-found.exception";
import { CreateGroupDTO } from "./dto/create-group.dto";
import { CreateUserGroupDTO } from "./dto/create_userGroup.dto";
import { DeleteGroupDTO } from "./dto/delete-group.dto";

@Injectable()
export class GroupService{
    constructor(@InjectRepository(Group, 'mchs_connection') private groupRepository: Repository<Group>,
    @InjectRepository(UserGroup, 'mchs_connection') private userGroupRepository: Repository<UserGroup>){}

    async getGroupById(idGroup: number): Promise<Group>{
        const group = this.groupRepository.findOneBy({idGroup});
        if(!group){
            throw new GroupNotFoundException(idGroup);
        }
        return group;
    } 

    async getGroupNameById(idGroup: number){
        const groupName = (await this.getGroupById(idGroup)).name;
        if(!groupName){
            throw new GroupNotFoundException(idGroup);
        }
        return groupName;
    }

    //getGroupByIdDept

    async getAllGroupsByIdDept(idDept: number, pagination: Pagination): Promise<Group[]>{
        const groups = await this.groupRepository.find({where:{
            active:1, idDept: idDept,
        }, order: {name: "ASC"}});
        if(groups.length == 0){
            throw new DeptNotFoundException(idDept);
        }
        return groups;
    }

    async getAllGroupsSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const groups = (await this.groupRepository.find({where:{active:1}}));
        const sorted = sortByField(groups, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    } 

    async createGroup(dto: CreateGroupDTO){
        const group = this.groupRepository.create(dto);
        return this.groupRepository.save(group);
    }

    async createGroupWithUserGroup(dto: CreateGroupDTO){
        const group = this.groupRepository.create(dto);
        const createdGroup = this.groupRepository.save(group);

        
        console.log();
    }

    async deleteGroup(dto: DeleteGroupDTO){
        //add GroupForbiddenExeption
        return this.groupRepository.update(dto.idGroup, {active: 2, dateRecord: new Date(Date.now()), uid: dto.uid});
    }

    //getAllUsersByGroup 

    async blockGroupById(idGroup: number){
        //add GroupForbiddenExeption
        return this.groupRepository.update(idGroup, {active: 0, dateRecord: new Date(Date.now())});
    }
}