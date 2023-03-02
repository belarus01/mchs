import { NotFoundException } from "src/modules/exception/not-found.exception";

export const OKED_NOT_FOUND_ERROR_CODE = 404;

export class OkedDateNotFoundException extends NotFoundException {
    constructor(idOked: number) {
        super(
            OKED_NOT_FOUND_ERROR_CODE,
            `The date of the Oked, with id = ${idOked}, not found!`
        );
    }
}