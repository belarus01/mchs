import { NotFoundException } from "src/modules/exception/not-found.exception";

export const OON_NOT_FOUND_ERROR_CODE = 404;

export class OonNotFoundException extends NotFoundException{
        constructor(idType: number){
            super(
                OON_NOT_FOUND_ERROR_CODE,
                `Oon id = ${idType} not found!`
            );
        }
}