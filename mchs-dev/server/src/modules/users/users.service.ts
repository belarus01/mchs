import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Observable, from, throwError, of } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { DeleteUserDTO } from './dto/deleteUser.dto';
import { UserNotFoundException } from './exception/user.not-found.exception';
import { DeptNotFoundException } from '../department/exception/dept.not-found.exception';
import { Order, Pagination, skipPage, sortByField } from 'src/utils/utils';

/* interface Sort{
    name:string;
    direction:string;
} */

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User, 'mchs_connection') private userRepository: Repository<User>){}



    async createUser(dto:CreateUserDto): Promise<User>{
        const user = this.userRepository.create(dto);
        //? if выбрасывающий 403 Exc-n на то что есть ли права создания, UserForbiddenException 
        return this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]>{
        const users = ((await this.userRepository.find({order: {lName: "ASC", fName: "ASC"}})));
        return users;
    }

    /*..*/
    async getAllActiveUsers(): Promise<User[]>{
        const users = await this.userRepository.find({where: {
            active:1
        }, order: {lName: "ASC", fName: "ASC"}});
        return users;
    }

    async getAllDeletedUsers(): Promise<User[]>{
        
        const users = await this.userRepository.find({where: {
            active:2
        }, order: {lName: "ASC", fName: "ASC"}});
        return users;
    }

    async getAllUnactiveUsers(): Promise<User[]>{
        const users = await this.userRepository.find({where: {
            active:0
        }, order: {lName: "ASC", fName: "ASC"}});
        return users;
    }

    async getAllUsersWithRelations():Promise<User[]>{
        const users = await this.userRepository.
        find({where:{
            active:1
        }, relations:{
            sSubjObjs:true,
            idDept2:true,
            idDeptJob2: true,    
        }, order: {lName: "ASC", fName: "ASC"}});
        return users;
    }

    //async getAllDeptUnitUsers(){}

    async getAllDeptUsers(id_dept:number): Promise<User[] | undefined> {  
        const users = await this.userRepository.find({where: {
            active:1, idDept:id_dept,
        },order: {lName: "ASC", fName: "ASC"}});
        if(users.length == 0){
            throw new DeptNotFoundException(id_dept);
        }
        return users;
    }

    async getAllDeptUsersWithRelatoins(id_dept:number): Promise<User[] | undefined> {  
        const users = await this.userRepository.find({where: {
            active:1, idDept:id_dept,
        },relations:{
            sSubjObjs:true,
            idDept2:true,
            idDeptJob2: true,  
        }, order: {lName: "ASC", fName: "ASC"}});
        if(users.length == 0){
            throw new DeptNotFoundException(id_dept);
        }
        return users;
    }
    
    async blockUserById(uid:number){
        const userToBlock = this.userRepository.update(uid, {active: 0, dateRecord: new Date(Date.now())});
        if(!userToBlock){
            throw new UserNotFoundException(uid);
        }
        return userToBlock;
    }

    async deleteUserById(uid: number){ 
        const userToDelete = this.userRepository.update(uid, {active: 2, dateRecord: new Date(Date.now())});
        if(!userToDelete){
            throw new UserNotFoundException(uid);
        }
        return userToDelete;
    }

    async deleteUser(dto: DeleteUserDTO){ 
        return this.userRepository.update({uid:dto.uid}, {active: 2, dateRecord: new Date(Date.now()), uidAdm: dto.adminUid});
    }

    async getUserById(uid:number): Promise<User>{
        const user = await this.userRepository.findOneBy({uid});
        if(!user){
            throw new UserNotFoundException(uid);
        }
        return user;
    }

    async getUserWithRelationsById(uid:number) : Promise<User>{
        const user = await this.userRepository.findOne({where: {
            active:1, uid:uid,
        },relations:{
            sSubjObjs:true,
            idDept2:true,
            idDeptJob2: true,  
        }});
        if(!user){
            throw new UserNotFoundException(uid);
        }
        return user;
    }

    async getUserByLogin(user: string): Promise<User>{
        const login = await this.userRepository.findOneBy({user});
        if(!login){
            throw new UserNotFoundException(login.uid);
        }
        return login;
    }

    updateOne(uid: number, dto:CreateUserDto): Observable<any> {
        return from(this.userRepository.update(uid, dto)).pipe(
            switchMap(() => this.getUserById(uid))
        ); 
    }

    async updateUser(user:User){ 
        return this.userRepository.update(user.uid, user);
    }

    async updateUserPassword(user: string, params:any){
        return this.userRepository.update({user:user}, {
            pas:params.pas, 
            passSha256: params.old.pas,
            passSha256_1: params.old.passSha256,
            passSha256_2: params.old.passSha256_1
        });
    }

    async getAllPasswordsBy(user:string){
        const pas:string[] = [];
        const passwords = await this.userRepository
        .findOne({select:{
            pas: true,
            passSha256: true,
            passSha256_1: true,
            passSha256_2: true,    
        }, where:{user: user}});
        pas.push(passwords.pas, passwords.passSha256, passwords.passSha256_1, passwords.passSha256_2);
        return pas;
    }

    async getAllPassByLogin(user:string){
        const client = await this.getUserByLogin(user);
    }

    async searchUser(query:string){
        const s = `%${query}%`;
        console.log(s);
        const users =  await this.userRepository.createQueryBuilder("users").leftJoinAndSelect("users.idDeptJob2", "sDeptJob")
            .where(`MATCH(l_name, s_name) AGAINST ('${s}' IN NATURAL LANGUAGE MODE)`)
            .getMany();
        console.log(users); 
        return users;
    }

/*     async getAllUsersWithRelationsByPages(pagination:Pagination){
        console.log(pagination);
        const users = await this.userRepository.
        find({where:{
            active:1
        }, relations:{
            sSubjObjs:true,
            idDept2:true,
            idDeptJob2: true,    
        }, order: {lName: "ASC", fName: "ASC"}, skip:pagination.pageSize*(pagination.current-1), take:pagination.pageSize},);
        pagination.total = users.length;
        return {users, pagination};// return {users, current, pageSize, total}
    } */

    async getAllUsersAndSortBy(field:string, order:string){
        const users = (await this.userRepository.find({where:{active:1}}));
        const sorted = sortByField(users, field, order);
        return sorted;
    }

    async getAllUsersSortAndPage(field:string, order:string, current: string, pageSize: string, total: number){
        const users = (await this.userRepository.find({where:{active:1}}));
        const sorted = sortByField(users, field, order);
        const paged = skipPage(sorted, current, pageSize, total);
        return paged;
    }

    


/*     async editUser(id: number, dto:CreateUserDto): Promise<User>{//тот же самый updateUser
        const editedUser = await this.userRepository.findByIdAndUpdate(id, dto, {new: true});
        
        return editedUser;
    } */
    
}
