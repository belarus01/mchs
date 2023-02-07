import { NotFoundException } from "src/modules/exception/not-found.exception";

export const GROUP_NOT_FOUND_ERROR_CODE = 404;

export class GroupNotFoundException extends NotFoundException{
    constructor(idGroup: number){
        super(
            GROUP_NOT_FOUND_ERROR_CODE,
            `Group id = ${idGroup} not found!`
        );
    }
}