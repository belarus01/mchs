import { NotFoundException } from "src/modules/exception/not-found.exception";

export const ADM_BAN_NOT_FOUND_ERROR_CODE = 404;

export class AdmBanNotFoundException extends NotFoundException{
        constructor(idBan: number){
            super(
                ADM_BAN_NOT_FOUND_ERROR_CODE,
                `AdmBan id = ${idBan} not found!`
            );
        }
}