import { NotFoundException } from "src/modules/exception/not-found.exception";

export const STATE_NOT_FOUND_ERROR_CODE = 404;

export class StateNotFoundException extends NotFoundException{
        constructor(idState: number){
            super(
                STATE_NOT_FOUND_ERROR_CODE,
                `State id = ${idState} not found!`
            );
        }
}