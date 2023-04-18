import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./group.entity";
import { UserGroup } from "./entity/userGroup.entity";
import { Repository } from "typeorm";
import { CreateUserGroupDTO } from "./dto/create_userGroup.dto";
import { CreateGroupDTO } from "./dto/create-group.dto";

@Injectable()
export class GarbageService{
   // constructor(@InjectRepository(Group, 'machs_connection') private groupRepository: Repository<Group>,
  //  @InjectRepository(UserGroup, 'mchs_connection') private userGroupRepository: Repository<UserGroup>){}
//1. создается группа => создается idGroup , также из user_group по uidGr2 нужно подтянуть релейшн 
//2. надо чтобы это отобразилось в таблице user_group: 

    //async createG(dto: CreateUserGroupDTO, group: Group){
        /* const newgroup = this.userGroupRepository.create(dto);
        //const created = this.groupRepository.save(group.userGroups = [...group.userGroups, newgroup]);
        const created = this.groupRepository.save({...newgroup, userGroups});
        console.log(created);
        return created;  */
   // }

/* 
    async createB(groupDto: CreateGroupDTO, usergroupDto: CreateUserGroupDTO){
        const newgroup = this.groupRepository.create(groupDto);
        const created = this.groupRepository.save(newgroup);
        const usergroups = this.userGroupRepository.create(usergroupDto);
        usergroups.array.forEach(element => element.groupDto = created);
        await this.userGroupRepository.save(usergroups);
        console.log(created)
        return created;
    } */


    /**const projectToSave = Project.create(project);
await projectToSave.save();

const projectUsers = ProjectUser.create(project.projectUsers);
projectUsers.forEach(p => p.project = projectToSave);
await projectUsers.save(projectUsers);
return projectToSave; 



const projectUsers = await ProjectUser.save(ProjectUser.create(project.projectUsers));
const projectToSave = Project.create(project);
projectToSave.projectUsers = projectUsers;
return await projectToSave.save();

*/
/* async createB2(group: Group){
    const usergroups = this.userGroupRepository.save(this.userGroupRepository.create(group.userGroups));
    const groups = this.groupRepository.create(group);
    
    return this.groupRepository.save(groups);
}
 */
    /**
     * public async getAccountByAccountIdWithRelations(accountId: string): Promise<Account> {
    return await this.findOneOrFail({id: accountId}, {relations: ['address']});
  }
     */





/*     async createSmth0(dto: CreateGroupDTO){ 
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
        const userGroupToFind = this.groupRepository.findOne({where: {
            //userGroup.idGroup2,
            idGroup: (await savedgroup).idGroup
        },relations: ['userGroups']});

        console.log(userGroupToFind);
        return savedgroup; */
/*         for(userGroup of userGroups){
            userGroups.push(group);
        }
        return this.userGroupRepository.save(userGroups) */
        //group.userGroups = ;
    }

    /**let entity = await this.userRepository.create(data);
let entity2 = {
        ...entity,
        roles: data.selectedRoles,
      };
const user = await this.userRepository.save(entity2); */
    

    /**
    return this.repository.find({
    relations: ['user'],
    loadRelationIds: true,
    where: { ... },
    order: { ... }
}); */

/*     async createSmth(dto: CreateGroupDTO){// Cannot read properties of undefined (reading 'joinColumns')
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
       // const usergroup = this.userGroupRepository.findOneOrFail({loadRelationIds:{relations: (await savedgroup).idGroup, } });
        //const usergroup = this.groupRepository.find({relations: ['userGroups'], loadRelationIds: true});
        const usergroup = this.groupRepository.find({relations: ['userGroups'], loadRelationIds: true});// или наоборот... loadRelationIds: true по отношению к группе
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
        
    } */

    /*Copy only some columns from one table into another table
    INSERT INTO table2 (column1, column2, column3, ...)
SELECT column1, column2, column3, ...
FROM table1
WHERE condition; */
/*     async createSmth3(dto: CreateGroupDTO){
        const group  = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
        const usergroup = await this.userGroupRepository.manager.query(`
        INSERT INTO user_group (id_group) SELECT g.id_group FROM mchs.group g
        `);
        return [savedgroup, usergroup];
    } */
//INSERT INTO user_group (uid_gr) SELECT (uid) FROM users
/*     async createSmth2(dto: CreateGroupDTO){
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
    } */

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

/*     async createGroupAndUserGroup(dto: CreateGroupDTO){
        const group = this.groupRepository.create(dto);
        //add GroupForbiddenExeption
        const userGroup = this.createUserGroup;
        const savedgroup = this.groupRepository.save(group);
    
        return [savedgroup, userGroup];
    } */


/*     async create(dto: CreateGroupDTO){
        const group = this.groupRepository.create(dto);
        const savedgroup = this.groupRepository.save(group);
       // const userGroup = this.userGroupRepository.findBy()
    }

    async createUserGroup(dto: CreateUserGroupDTO): Promise<UserGroup>{
        const usergroup = this.userGroupRepository.create(dto);
        return this.userGroupRepository.save(usergroup);
    } */


       
    /* const relationWithUserGroup = this.groupRepository.findOne({where: {
            idGroup: (await createdGroup).idGroup
        }, relations: ['userGroups'], loadRelationIds: true}); */

        //const relationWithUserGroup = this.groupRepository.find({relations: ['userGroups'], loadRelationIds: true});//Cannot read properties of undefined (reading 'joinColumns') , even with @JoinColumn in user, group entities

        //const relationsWithGroup = this.userGroupRepository.find({relationLoadStrategy: "join"})
        //const relationsWithGroup = this.userGroupRepository.find({relations: ['groups'], loadRelationIds: true});//Property "group" was not found in "UserGroup". Make sure your query is correct.
        //console.log(relationWithUserGroup);
        //и далее запушить

/* 
        const found = await this.groupRepository.findOne({where: {idGroup: (await createdGroup).idGroup}});//выбрать группу по id и далее впихнуть в user_group
        //и какие же у нас есть варианты как впихнуть : через spread operator/
        console.log(found); */





    //1. createGroup + updateUserGroup, где
    /**то есть да нужно сначала создать группу с ее названием , создасться с ее уникальным 
     * и нужно CreateUserGroupDTO, которе также будет ИЛИ передать параметры UserGroup в CreateGroupDto
    */

    /*2. createUserGroup (метод createGroup убираем, оставлям лишь CreateGroupDTO), и там уже 
    --- не подойдет так как нужно сначала создать idGroup а потом уже свзяывать 
    */
    
//}