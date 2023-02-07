import { NotFoundException } from "src/modules/exception/not-found.exception";

export const USER_GROUP_NOT_FOUND_ERROR_CODE = 404;

export class UserGroupNotFoundException extends NotFoundException{
    constructor(idGroup: number){
        super(
            USER_GROUP_NOT_FOUND_ERROR_CODE,
            `Users of Group with id = ${idGroup} not found!`
        );
    }
}