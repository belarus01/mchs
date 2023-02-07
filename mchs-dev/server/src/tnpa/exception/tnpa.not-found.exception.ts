import { NotFoundException } from "src/modules/exception/not-found.exception";

export const TNPA_NOT_FOUND_ERROR_CODE = 404;

export class TnpaNotFoundException extends NotFoundException{
        constructor(idTnpa: number){
            super(
                TNPA_NOT_FOUND_ERROR_CODE,
                `TNPA id = ${idTnpa} not found!`
            );
        }
}