import { NotFoundException } from "src/modules/exception/not-found.exception";

export const OKED_NOT_FOUND_ERROR_CODE = 404;

export class OkedNotFoundException extends NotFoundException{
        constructor(idOked: number){
            super(
                OKED_NOT_FOUND_ERROR_CODE,
                `Oked id = ${idOked} not found!`
            );
        }
}