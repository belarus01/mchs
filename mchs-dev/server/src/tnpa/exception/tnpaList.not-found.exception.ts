import { NotFoundException } from "src/modules/exception/not-found.exception";

export const TNPA_LIST_NOT_FOUND_ERROR_CODE = 404;

export class TnpaListNotFoundException extends NotFoundException{
        constructor(idList: number){
            super(
                TNPA_LIST_NOT_FOUND_ERROR_CODE,
                `TNPA List id = ${idList} not found!`
            );
        }
}