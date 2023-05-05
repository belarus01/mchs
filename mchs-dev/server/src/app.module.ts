 import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { ObjectModule } from './modules/object/object.module';
import { SubjectModule } from './modules/subject/subject.module';
import { GroupModule } from './modules/group/group.module';
import { TaskModule } from './modules/task/task.module';
import { DepartmentModule } from './modules/department/department.module';
import { JobTitleModule } from './modules/jobTitle/jobTitle.module';
import { PermissionModule } from './modules/permission/permission.module';
import { LocationModule } from './modules/location/location.module';
import { ChlistModule } from './modules/chlist/chlist.module';
import { MulterModule } from '@nestjs/platform-express';
//import { UserGroupModule } from './modules/userGroup/user-group.module';
import { SoatoModule } from './soato/soato.module';
import { AteModule } from './modules/ate/ate.module';
import { UnitModule } from './modules/unit/unit.module';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { TnpaModule } from './tnpa/tnpa.module';
import { OkedModule } from './oked/oked.module';
import { SopbModule } from './sopb/sopb.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './modules/filter/all-exceptions.filter';
import { ExceptionInterceptor } from './modules/interceptor/exception.interceptor';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationGateway } from './modules/notification/notification.gateway';
import { VedomstvaModule } from './modules/vedomstva/vedomstva.module';
import { StateModule } from './modules/state/state.module';
import { DefectionModule } from './modules/defection/defection.module';
import { FormModule } from './modules/form/form.module';
import { QuestionModule } from './modules/question/question.module';
import { OonModule } from './modules/oon/oon.module';
import { PooModule } from './modules/poo/poo.module';
import { OpoModule } from './modules/opo/opo.module';
import { AdmModule } from './modules/adm/adm.module';
import { TypeModule } from './modules/type/type.module';
import { PogModule } from './modules/pog/pog.module';
import { FileModule } from './file/file.module';
import { FireModule } from './modules/fire/fire.module';
import { DocGenerationModule } from './doc-generation/doc-generation.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
     name: 'mchs_connection',
      type:'mysql',
      host:'192.168.150.29',// 192.168.150.29 | localhost
      port: 3306,
      username: 'serge',// serge | tanya | root
      password: '123456_Qq',// 123456_Qq | 123456
      database: 'mchs',
      
      entities:[],
      
      synchronize:false,
      autoLoadEntities: true
    }),
/*     TypeOrmModule.forRoot({
      name: 'doc_connection',
       type:'mysql',
       host:'192.168.150.183',// 192.168.150.29 | localhost
       port: 3306,
       username: 'root',// serge | tanya | root
       password: 'root',// 123456_Qq | 123456
       database: 'doc',
       
       entities:[],
       synchronize:false,
       autoLoadEntities: true
     }), */

    // TypeOrmModule.forRootAsync({
    //   name: 'mchs_connection',
    //   useFactory: async () => {
    //     return {
    //    type:'mysql',
    //    host:'localhost',
    //    port: 3306,
    //    username: 'tanya',
    //    password: '123456_Qq',
    //    database: 'mchs',
       
    //    entities:[],
    //    synchronize:false,
    //    autoLoadEntities: true
    //     }as MysqlConnectionOptions},
    //  }),
    //  TypeOrmModule.forRootAsync({
    //   name: 'doc_connection',
    //   useFactory: async () => {
    //     return {
    //    type:'mysql',
    //    host:'localhost',
    //    port: 3306,
    //    username: 'tanya',
    //    password: '123456_Qq',
    //    database: 'doc',
       
    //    entities:[],
    //    synchronize:false,
    //    autoLoadEntities: true
    //     }as MysqlConnectionOptions},
    //  }),

    AuthModule,
    UsersModule,
    EventsModule,
    StatisticsModule,
    ObjectModule,
    SubjectModule,
    GroupModule,
    TaskModule,
    DepartmentModule,
    JobTitleModule,
    PermissionModule,
    LocationModule,
    ChlistModule,
    //UserGroupModule,
    
    MulterModule.register({
      dest: './uploads',
    }),
    FileModule,

    SoatoModule,
    AteModule,
    UnitModule,
    TnpaModule,
    OkedModule,
    SopbModule,
    NotificationModule,
    VedomstvaModule,
    StateModule,
    TnpaModule,
    DefectionModule,
    FormModule,
    QuestionModule,
    OonModule,
    PooModule,
    OpoModule,
    AdmModule,
    TypeModule,
    PogModule,
    FileModule,
    FireModule, 
    DocGenerationModule
  
  ],
  controllers: [AppController],
//   providers: [
/*     {
        provide: APP_GUARD,
        useClass: RolesGuard,
        } */
//     {
//     provide: APP_INTERCEPTOR,
//     //scope: Scope.REQUEST,
//     useClass: ExceptionInterceptor,
//   },
// /*{
//     //add TimeoutInterceptor to consider When your endpoint doesn't return anything after a period of time
//     provide: APP_INTERCEPTOR,
//     useClass: TimeInterceptor
//   }, */
// /* {
//     provide: APP_FILTER,
//     useClass: AllExceptionsFilter,//added globaly in main.ts    
// },*/
// ],
  providers: [
  //   {
  //   provide: APP_INTERCEPTOR,
  //   //scope: Scope.REQUEST,
  //   useClass: ExceptionInterceptor,
  // },
/*{
    //add TimeoutInterceptor to consider When your endpoint doesn't return anything after a period of time
    provide: APP_INTERCEPTOR,
    useClass: TimeInterceptor
  }, */
/* {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,//added globaly in main.ts    
},*/
],
})
export class AppModule {}
