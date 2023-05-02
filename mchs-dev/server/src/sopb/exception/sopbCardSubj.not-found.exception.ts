import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SOPB_CARD_SUBJ_NOT_FOUND_ERROR_CODE = 404;

export class SopbCardSubjNotFoundException extends NotFoundException{
        constructor(idData: number){
            super(
                SOPB_CARD_SUBJ_NOT_FOUND_ERROR_CODE,
                `Sopd Card Subj id = ${idData} not found!`
            );
        }
}