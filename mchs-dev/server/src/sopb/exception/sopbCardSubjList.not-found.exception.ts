import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SOPB_CARD_SUBJ_LIST_NOT_FOUND_ERROR_CODE = 404;

export class SopbCardSubjListNotFoundException extends NotFoundException{
        constructor(idList: number){
            super(
                SOPB_CARD_SUBJ_LIST_NOT_FOUND_ERROR_CODE,
                `Sopd Card Subj List id = ${idList} not found!`
            );
        }
}