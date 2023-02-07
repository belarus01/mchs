import { NotFoundException } from "src/modules/exception/not-found.exception";

export const EVENT_NOT_FOUND_ERROR_CODE = 404;

export class EventNotFoundException extends NotFoundException{
    constructor(description?: string){
        super(
            EVENT_NOT_FOUND_ERROR_CODE,
            description
            //`Event id = ${idEvent} not found!`
        );
    }
}