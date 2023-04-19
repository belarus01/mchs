import { NotFoundException } from "src/modules/exception/not-found.exception";

export const POG_NOT_FOUND_ERROR_CODE = 404;

export class PogNotFoundException extends NotFoundException{
    constructor(description?: string){
        super(
            POG_NOT_FOUND_ERROR_CODE,
            description
            //`Pog .. id = ${idList} not found!`
        );
    }
}