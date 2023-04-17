import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { UserGroup } from "./entity/userGroup.entity";
import { Repository } from "typeorm";
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

//1. создается группа => создается idGroup , также из user_group по uidGr2 нужно подтянуть релейшн 
//2. надо чтобы это отобразилось в таблице user_group: 

    async createG(dto: CreateUserGroupDTO, group: Group){
        const newgroup = this.userGroupRepository.create(dto);
        const created = this.groupRepository.save(group.userGroups = [...group.userGroups, newgroup]);
        return created; 
    }








/* 
    async createSmth0(dto: CreateGroupDTO, userGroup: UserGroup){ 
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
        const userGroupToFind = this.userGroupRepository.findOne({where: {
            //userGroup.idGroup2,
            idGroup: (await savedgroup).idGroup
        },relations: ['userGroups']});

        for(userGroup of userGroups){
            userGroups.push(group);
        }
        return this.userGroupRepository.save(userGroups)
        //group.userGroups = ;
    } */

    

    /**
    return this.repository.find({
    relations: ['user'],
    loadRelationIds: true,
    where: { ... },
    order: { ... }
}); */

    async createSmth(dto: CreateGroupDTO){
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
       // const usergroup = this.userGroupRepository.findOneOrFail({loadRelationIds:{relations: (await savedgroup).idGroup, } });
        //const usergroup = this.groupRepository.find({relations: ['userGroups'], loadRelationIds: true});
        const usergroup = this.groupRepository.find({relations: ['userGroups'], loadRelationIds: true});
        (await usergroup).push({
            org: 0,
            name: '',
            idDept: 0,
            active: 0,
            dateRecord: undefined,
            sEventsOrders: [],
            userGroups: [],
            idGroup: (await savedgroup).idGroup,
            uid: 0
        })
        console.log(usergroup);
        return savedgroup;
        //(await usergroup).push(savedgroup)
        
    }

    /*Copy only some columns from one table into another table
    INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM table1
WHERE condition; */
    async createSmth3(dto: CreateGroupDTO){
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
        const usergroup = await this.userGroupRepository.manager.query(`
        INSERT INTO user_group (id_group) SELECT g.id_group FROM mchs.group g
        `);
        return [savedgroup, usergroup];
    }
//INSERT INTO user_group (uid_gr) SELECT (uid) FROM users
    async createSmth2(dto: CreateGroupDTO){
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
        const found = await this.userGroupRepository
        .createQueryBuilder("user_group")
        .leftJoinAndSelect("user_group.uidGr2", "uidGr2")
        .getMany();
        console.log(found);
        console.log(savedgroup);
        return found;
        //взять id
        //const value = this.userGroupRepository.createQueryBuilder("userGroup").leftJoinAndMapOne("userGroup.idGroup2", "group")
         //   .getMany();
        //console.log(value);
        //return [savedgroup, value];
    }

    /**const first = await createQueryBuilder()
  .select(‘user’)
  .from(User, ‘user’)
  // ------------------------ fixed ------------------------
  .leftJoinAndMapOne(‘user.id’, Post, ‘post’, ‘post.userId = user.id’)
  // -------------------------------------------------------
  .getMany() */

    /**    async searchUser(query:string){
        const s = `%${query}%`;
        console.log(s);
        const users =  await this.userRepository.createQueryBuilder("users").leftJoinAndSelect("users.idDeptJob2", "sDeptJob")
            .where(`MATCH(l_name, s_name) AGAINST ('${s}' IN NATURAL LANGUAGE MODE)`)
            .getMany();
        console.log(users); 
        return users;
    } */
    /* const values = this.billRepository.createQueryBuilder("bill")
    .leftJoinAndSelect("bill.user", "user")
    .where("bill.accountBill LIKE :accountBill", {accountBill})
    .andWhere("user.id = :userId", {userId: user.id})
    .select(["user.name", "user.surname"])
    .execute(); */

    async createGroupAndUserGroup(dto: CreateGroupDTO){
        const group = this.groupRepository.create(dto);
        //add GroupForbiddenExeption
        const userGroup = this.createUserGroup;
        const savedgroup = this.groupRepository.save(group);
    
        return [savedgroup, userGroup];
    }


    async create(dto: CreateGroupDTO){
        const group = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
       // const userGroup = this.userGroupRepository.findBy()
    }

    async createUserGroup(dto: CreateUserGroupDTO): Promise<UserGroup>{
        const usergroup = this.userGroupRepository.create(dto);
        return this.userGroupRepository.save(usergroup);
    }

    //1. createGroup + updateUserGroup, где
    /**то есть да нужно сначала создать группу с ее названием , создасться с ее уникальным 
     * и нужно CreateUserGroupDTO, которе также будет ИЛИ передать параметры UserGroup в CreateGroupDto
    */

    /*2. createUserGroup (метод createGroup убираем, оставлям лишь CreateGroupDTO), и там уже 
    --- не подойдет так как нужно сначала создать idGroup а потом уже свзяывать 
    */
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