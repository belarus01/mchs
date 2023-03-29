import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { exec } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUnautorizedException } from './exception/auth.unauthorized.exception';
import { AuthBadRequestException } from './exception/auth.bad-request.exception';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService, private configService: ConfigService){}

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto);
        const token = this.generateToken(user);
        return {
            user: user,
            token: token
        }
    }

    private async generateToken(user: User) {
        const payload = {login: user.user, id: user.uid, role: user.userRole};
        console.log(this.configService.get<string>('PRIVATE_KEY'));
        return {
            accessToken: this.jwtService.sign(
                payload,
                {
                    secret: process.env.PRIVATE_KEY, expiresIn: process.env.EXPIRES_IN
                }
            )
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByLogin(userDto.user); 
        if(!user){
            throw new AuthUnautorizedException('Пользователь с таким логином не существует');
        }else if(user.active === 0){
            throw new AuthUnautorizedException('Статус пользователя: не активен');
        }else if(user.active === 2){
            throw new AuthUnautorizedException('Статус пользователя: удален');
        }
            
        const passwordEquals = await bcrypt.compare(userDto.pas, user.pas);
        if (user && !passwordEquals){
            user.loginAttempts++;
            this.userService.updateUser(user);
            //this.userService.update(user.uid, {loginAttempts: user.loginAttempts + 1});
            throw new AuthUnautorizedException('Некорректный пароль');
        }
        if(user && passwordEquals && user.active === 1){
            user.lastLogin = new Date(Date.now());
            this.userService.updateUser(user);
            return user;
        }   
    }
    async generateHash(pas:string){
        const hashPassword = await bcrypt.hash(pas, 5);//или не надо..
        console.log(hashPassword);
        return hashPassword;
    }
    async compare(pas:string, hash:string){
        if(hash === null){
            return false;
        }
        return await bcrypt.compare(pas, hash);
    }
    async comparePasswords(userOldPasswords:any, password: string){
        /**
         * 1. метод в юзер сервисе на получение массива паролей по юзер id
         * 1.1 получение массива паролей - ,а можно через и spread operator кстати/ не мудрить и просто find
         * 2. пройтись лупом c bcrypt.compare
         * p.s. plaintext -> hash -> compare the results to the stored hash to see if they match
            plaintext - идет от клинта => это userDto.pas
            и для начала его нужно захешировать, а потом уже сравнивать 
        */
        const firstCompare = await this.compare(password, userOldPasswords.pas);
        const secondCompare = await this.compare(password, userOldPasswords.passSha256);
        const thirdCompare = await this.compare(password, userOldPasswords.passSha256_1);
        const fourthCompare = await this.compare(password, userOldPasswords.passSha256_2);

        if(firstCompare === true || secondCompare === true || thirdCompare === true || fourthCompare === true){
            return true;
        }else{ return false;}

        /* userOldPasswords.forEach(async password => { return await bcrypt.compare(userDto.pas, password)
            .then(isMatch => {
                if (isMatch) {
                    //a) либо сделать на тру фолз и потом главный метод comaparePasswords вставить где надо
                    //либо...
                }
            });}); */


        //надо чтобы pass был string 
//!!может мы не то получаем? в getAllPasswordsById, нам же нужны пароли именно, а не сущность в виде логина и её паролей, проверь сам метод в постман что выводит , подумай как именно массив состоящий из паролей получить

        // но тут логика будет наоборот чем ниже
        /* if (isMatch) {
            // User matched
            // Creating payload
            const payload = {
                id: user.id,
                username: user.username
            }
            // Sign token
            jwt.sign(payload, secret, { expiresIn: 3600 * 24 }, (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                }); */
    }

    async updatePassword(user: LoginUserDto){
    
        const userOldPasswords = await this.userService.getAllPasswordsBy(user.user);
        

        const result = await this.comparePasswords(userOldPasswords, user.pas);
        console.log(result);
        
        if(result === true){
          throw new AuthBadRequestException();
        }

        const hashPassword = await bcrypt.hash(user.pas, 5);
        const res = await this.userService.updateUserPassword(user.user, {pas:hashPassword, old:userOldPasswords});
        return res;
        
        
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.user);
        if(candidate){
            throw new AuthBadRequestException('Пользователь с таким логином уже существует');
            //throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.pas, 5);
        console.log(hashPassword);
        const user = await this.userService.createUser({...userDto, pas: hashPassword});
        return this.generateToken(user);
    }

    async getUserByToken(token:string){
        const user = this.jwtService.verify(token, {secret: process.env.PRIVATE_KEY});
        const userWithRelations = this.userService.getUserWithRelationsById(user.id);
        return userWithRelations;
    }
}
