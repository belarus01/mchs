import { NotFoundException } from "src/modules/exception/not-found.exception";

export const DEFECTION_NOT_FOUND_ERROR_CODE = 404;

export class DefectionNotFoundException extends NotFoundException{
    constructor(idDef: number){
        super(
            DEFECTION_NOT_FOUND_ERROR_CODE,
            `Defection id = ${idDef} not found!`
        );
    }
}