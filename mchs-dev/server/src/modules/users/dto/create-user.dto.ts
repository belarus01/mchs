import { IsEmail } from "class-validator";
import { IsNotEmpty, IsPhoneNumber } from "class-validator"; 
import { ROLES } from "src/modules/auth/role.enum";

export class CreateUserDto{//changed from interface to class to make class-validator work, to correctly validate errors from main.ts ValidationPipe
    //@IsNotEmpty()
    user: string;//login

   // @IsNotEmpty()
    pas: string;

    fName?: string;
    sName?: string;
    lName?: string;

  // @IsPhoneNumber('BY')
    tel?: string;

    idDept: number;
    idDeptUnits: number;
    idDeptJob: number;

   //@IsEmail()
    email?: string;

    position?: string;
    role?:ROLES;
    uidAdm?: number;
}