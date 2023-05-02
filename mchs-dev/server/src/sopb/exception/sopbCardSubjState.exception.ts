import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SOPB_CARD_SUBJ_STATE_NOT_FOUND_ERROR_CODE = 404;

export class SopbCardSubjStateNotFoundException extends NotFoundException{
        constructor(idDataState: number){
            super(
                SOPB_CARD_SUBJ_STATE_NOT_FOUND_ERROR_CODE,
                `Sopd Card Subj State id = ${idDataState} not found!`
            );
        }
}