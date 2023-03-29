import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ROLES } from './role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        console.log(userDto);
        return this.authService.login(userDto);
    }

    /*@UseGuards(RolesGuard)
    @Roles(Role.Syperadmin)*/
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto);
    }

    @Post('/getuser')
    getUserByToken(@Body() token: string){
        return this.authService.getUserByToken(token);
    }

    @Put('/update/pass')
    updateUserPassword(@Body() user: LoginUserDto){
      //return this.authService.generateHash(user.pas);  
      return this.authService.updatePassword(user);
    }

    /** @Post('register')
  register(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  } */
}
