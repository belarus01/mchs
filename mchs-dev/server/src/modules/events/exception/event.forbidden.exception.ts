import { ForbiddenException } from "src/modules/exception/forbidden.exception";

export const EVENT_FORBIDDEN_ERROR_CODE = 403;

export class EventForbiddenException extends ForbiddenException{
    constructor(uid: number){
        super(
            EVENT_FORBIDDEN_ERROR_CODE,
            `User id = ${uid} is not allowed` //to CRUD...
        )
    }
}