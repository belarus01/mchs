import { NotFoundException } from "src/modules/exception/not-found.exception";

export const LOCATION_NOT_FOUND_ERROR_CODE = 404;

export class LocationNotFoundException extends NotFoundException{
    constructor(uid: number){
        super(
            LOCATION_NOT_FOUND_ERROR_CODE,
            `Location of User with id = ${uid} not found!`
        );
    }
}