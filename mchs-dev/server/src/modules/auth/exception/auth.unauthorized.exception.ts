import { UnauthorizedException } from "src/modules/exception/unauthorized.exception";

export const AUTH_UNAUTHORIZED_ERROR_CODE = 401; //here could be any code

export class AuthUnautorizedException extends UnauthorizedException{
    constructor(description?: string){
        super(
            AUTH_UNAUTHORIZED_ERROR_CODE,
            //`User id = ${uid} unauthorized!`,
             description
        );
    }
}