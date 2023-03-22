import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { exec } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUnautorizedException } from './exception/auth.unauthorized.exception';
import { AuthBadRequestException } from './exception/auth.bad-request.exception';
import { User } from 'src/entities/mchs/Users';
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
