import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[
    UsersModule,
    JwtModule,
    ConfigModule
  ],
  exports:[
    AuthService,
    JwtModule
  ]

})
export class AuthModule {}
