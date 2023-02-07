import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeptNotFoundException } from '../department/exception/dept.not-found.exception';
import { UserGroup } from '../userGroup/user-group.entity';
import { CreateGroupDTO } from './dto/create-group.dto';
import { DeleteGroupDTO } from './dto/delete-group.dto';
import { GroupNotFoundException } from './exception/group.not-found.exception';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
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

    async getAllGroupsByIdDept(idDept: number): Promise<Group[]>{
        const groups = await this.groupRepository.find({where:{
            active:1, idDept: idDept,
        }});
        if(groups.length == 0){
            throw new DeptNotFoundException(idDept);
        }
        return groups;
    }

    async createGroup(dto: CreateGroupDTO): Promise<Group>{//!!уточнить create-group.dto
        const group = this.groupRepository.create(dto);
        //add GroupForbiddenExeption
        return this.groupRepository.save(group);// + update UserGroup
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
