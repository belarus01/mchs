import {Body, Controller, Delete, Get, Post, Put, Param, NotFoundException, Res, HttpStatus, UseFilters} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Observable, from, throwError } from 'rxjs';
import { DeleteUserDTO } from './dto/deleteUser.dto';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { UpdateDateColumn } from 'typeorm';

@Controller('users')
//@UseFilters(new HttpExceptionFilter())//probably no sense bcs the global one is set in app.module/main.ts
export class UsersController {
    constructor(private usersService: UsersService){}
    @Post('/create')
    createUser(@Body() dto: CreateUserDto){
        console.log(dto.user);
        return this.usersService.createUser(dto);
    }

    @Get('/get/all')
    getAllUsers(){
        return this.usersService.getAllUsers();
    }

   /*  @Get('/get/pass')
    getAllPasswordsBy(){
        return this.usersService.getAllPasswordsBy();
    } */
    
    


    /*..*/
    @Get('/get/all/active')
    getAllActiveUsers(){
        return this.usersService.getAllActiveUsers();
    }

    @Get('/get/all/unactive')
    getAllUnactiveUsers(){
        return this.usersService.getAllUnactiveUsers();
    }
 
    @Get('/get/all/deleted')
    getAllDeletedUsers(){
        return this.usersService.getAllDeletedUsers();
    }



    @Get('/get/all/relations')
    getAllUsersWithRelations(){
        return this.usersService.getAllUsersWithRelations();
    }

   /*  @Delete('/delete/:uid')//@Delete('delete/{id}')
    deleteUserById(@Param('uid') uid: number){
        return this.usersService.deleteUserById(uid);
    } */

    @Put('/delete')
    deleteUser(@Body() deleteUserDTO: DeleteUserDTO){
        console.log(deleteUserDTO.adminUid);
        return this.usersService.deleteUser(deleteUserDTO);
    }


    @Get('/get/id/:uid')
    async getUserById(@Param('uid') uid: number){
        const user = await this.usersService.getUserById(uid);
        //console.log(user.dateRecord);
        if(!user) throw new NotFoundException('User does not exist');
        return user;
    }


    @Get('/get/login/:user')
    async getUserByLogin(@Param('user') user: string){
        const user_ = await this.usersService.getUserByLogin(user)
        //console.log(login);
        if(!user_) throw new NotFoundException('User does not exist');
        return user_; 
    }

    @Get('/get/all/department/:idDept')
    async getAllUsersByDept(@Param('idDept') idDept: number){
        const users = await this.usersService.getAllDeptUsers(idDept);
        return users;
    }

    @Get('/get/all/department/relations/:idDept')
    async getAllUsersByDeptWithRelations(@Param('idDept') idDept: number){
        const users = await this.usersService.getAllDeptUsersWithRelatoins(idDept);
        return users;
    }

    @Put('/update')
    updateUser(){
        
    }

    @Put('/updateOne')
    updateOne(@Param('uid') uid: number, @Body() dto: CreateUserDto): Observable<any> {
        return this.usersService.updateOne(Number(uid), dto);
    }

    @Put('/block')
    blockUser(@Body() dto:DeleteUserDTO){
        return this.usersService.blockUserById(dto.uid);
    }

    @Post('/passwords')
    getOldPasswords(@Body() dto: any){
        console.log(dto.user);
        return this.usersService.getAllPasswordsBy(dto.user);
    }


/*     @Put('/edit')
    async editUser(@Param('id') id: number, @Body() dto: CreateUserDto, @Res() res){
        const editedUser = await this.usersService.editUser(id, dto)
        if (!editedUser) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            post: editedUser
        })
    } */
    /*
    @Put('/edit')
    async editUser(
        @Res() res, @Query('id', new ValidateObjectId()) id, @Body() createUserDTO: CreateUserDTO) {
        const editedUser = await this.userService.editUser(id, createUserDTO);
        if (!editedUser) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            post: editedUser
        })
    }*/
 
}
