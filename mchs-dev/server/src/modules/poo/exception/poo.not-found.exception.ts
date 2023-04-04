import { NotFoundException } from "src/modules/exception/not-found.exception";

export const POO_NOT_FOUND_ERROR_CODE = 404;

export class PooNotFoundException extends NotFoundException{
        constructor(idPoo: number){
            super(
                POO_NOT_FOUND_ERROR_CODE,
                `Poo id = ${idPoo} not found!`
            );
        }
}