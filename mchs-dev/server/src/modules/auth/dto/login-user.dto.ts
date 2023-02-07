import { IsNotEmpty } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty()
    user: string;//login

    @IsNotEmpty()
    pas: string;
}