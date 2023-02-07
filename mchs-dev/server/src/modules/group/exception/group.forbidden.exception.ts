import { ForbiddenException } from "src/modules/exception/forbidden.exception";

export const GROUP_FORBIDDEN_ERROR_CODE = 403;

export class GroupForbiddenException extends ForbiddenException{
    constructor(uid: number){
        super(
            GROUP_FORBIDDEN_ERROR_CODE,
            `User id = ${uid} is not allowed`
        )
    }
}