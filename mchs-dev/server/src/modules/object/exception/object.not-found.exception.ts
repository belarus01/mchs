import { NotFoundException } from "src/modules/exception/not-found.exception";

export const OBJECT_NOT_FOUND_ERROR_CODE = 404;

export class ObjectNotFoundException extends NotFoundException{
        constructor(idObj: number){
            super(
                OBJECT_NOT_FOUND_ERROR_CODE,
                `Object id = ${idObj} not found!`
            );
        }
}