import { NotFoundException } from "src/modules/exception/not-found.exception";

export const VEDOMSTVO_NOT_FOUND_ERROR_CODE = 404;

export class VedomstvoNotFoundException extends NotFoundException{
    constructor(idVed: number){
        super(
            VEDOMSTVO_NOT_FOUND_ERROR_CODE,
            `Vedomstvo id = ${idVed} not found!`
        );
    }
}