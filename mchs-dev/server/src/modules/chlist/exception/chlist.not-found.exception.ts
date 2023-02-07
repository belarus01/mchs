import { NotFoundException } from "src/modules/exception/not-found.exception";

export const CHLIST_NOT_FOUND_ERROR_CODE = 404;

export class ChlistNotFoundException extends NotFoundException{
    constructor(idChlist: number){
        super(
            CHLIST_NOT_FOUND_ERROR_CODE,
            `Check list id = ${idChlist} not found!`
        );
    }
}