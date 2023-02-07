import { NotFoundException } from "src/modules/exception/not-found.exception";

export const UNIT_NOT_FOUND_ERROR_CODE = 404;

export class UnitNotFoundException extends NotFoundException{
        constructor(){
            super(
                UNIT_NOT_FOUND_ERROR_CODE,
                `Not found (in unit module)!`
            );
        }
}