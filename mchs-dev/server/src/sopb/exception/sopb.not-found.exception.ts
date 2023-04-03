import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SOPB_NOT_FOUND_ERROR_CODE = 404;

export class SopbNotFoundException extends NotFoundException{
        constructor(idSopb: number){
            super(
                SOPB_NOT_FOUND_ERROR_CODE,
                `Sopd id = ${idSopb} not found!`
            );
        }
}