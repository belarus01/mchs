import { CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { env } from "process";
import { Observable } from "rxjs";
import { User } from "../users/user.entity";
import { ROLES } from "./role.enum";
import { ROLES_KEY } from "./roles.decorator";

export class RolesGuard implements CanActivate{
    constructor(private jwtService: JwtService, private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(
            ROLES_KEY, 
            [
                context.getHandler(), 
                context.getClass()
            ]
        );

        if(!requiredRoles){
            return true;
        }

        const req = context.switchToHttp().getRequest();
        try{
            const authHeader = req.headers.autorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            const user = this.jwtService.verify<User>(token, {secret: process.env.PRIVATE_KEY});

            req.user = user;
            return requiredRoles.some((role) => user.userRole === role);
        }catch(e){
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
}