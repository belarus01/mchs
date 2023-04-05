import { NotFoundException } from "src/modules/exception/not-found.exception";

export const TNPA_STR_ELEM_NOT_FOUND_ERROR_CODE = 404;

export class TnpaStrElemNotFoundException extends NotFoundException{
        constructor(idElem: number){
            super(
                TNPA_STR_ELEM_NOT_FOUND_ERROR_CODE,
                `TNPA Str Elem id = ${idElem} not found!`
            );
        }
}