import { NotFoundException } from "src/modules/exception/not-found.exception";

export const ADM_FORCE_NOT_FOUND_ERROR_CODE = 404;

export class AdmForceNotFoundException extends NotFoundException{
        constructor(idForce: number){
            super(
                ADM_FORCE_NOT_FOUND_ERROR_CODE,
                `AdmForce id = ${idForce} not found!`
            );
        }
}