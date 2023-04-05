import { NotFoundException } from "src/modules/exception/not-found.exception";

export const OPO_NOT_FOUND_ERROR_CODE = 404;

export class OpoNotFoundException extends NotFoundException{
        constructor(idOpo: number){
            super(
                OPO_NOT_FOUND_ERROR_CODE,
                `Opo id = ${idOpo} not found!`
            );
        }
}