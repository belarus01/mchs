import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SOATO_NOT_FOUND_ERROR_CODE = 404;

export class SoatoNotFoundException extends NotFoundException{
    constructor(idSoato: number){
        super(
            SOATO_NOT_FOUND_ERROR_CODE,
            `Soato id = ${idSoato} not found!`
        );
    }
}