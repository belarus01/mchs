import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SOPB_CARD_NOT_FOUND_ERROR_CODE = 404;

export class SopbCardNotFoundException extends NotFoundException{
        constructor(idCard: number){
            super(
                SOPB_CARD_NOT_FOUND_ERROR_CODE,
                `Sopd Card id = ${idCard} not found!`
            );
        }
}