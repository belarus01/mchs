import { NotFoundException } from "src/modules/exception/not-found.exception";

export const USER_NOT_FOUND_ERROR_CODE = 404;

export class UserNotFoundException extends NotFoundException{
    constructor(uid: number){
        super(
            USER_NOT_FOUND_ERROR_CODE,
            `User id = ${uid} not found!`
        );
    }
}