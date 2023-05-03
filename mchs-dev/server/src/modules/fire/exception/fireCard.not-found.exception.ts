import { NotFoundException } from "src/modules/exception/not-found.exception";

export const FIRE_CARD_NOT_FOUND_ERROR_CODE = 404;

export class FireCardNotFoundException extends NotFoundException{
        constructor(idList: number){
            super(
                FIRE_CARD_NOT_FOUND_ERROR_CODE,
                `Fire Card id = ${idList} not found!`
            );
        }
}