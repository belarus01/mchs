import { NotFoundException } from "src/modules/exception/not-found.exception";

export const  ATE_NOT_FOUND_EXCEPTION= 404;

export class AteNotFoundException extends NotFoundException{
    constructor(){
        super(
            ATE_NOT_FOUND_EXCEPTION,
            `ATE not found!`
        );
    }
}