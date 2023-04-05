import { NotFoundException } from "src/modules/exception/not-found.exception";

export const FORM_NOT_FOUND_ERROR_CODE = 404;

export class FormNotFoundException extends NotFoundException{
        constructor(idForm: number){
            super(
                FORM_NOT_FOUND_ERROR_CODE,
                `Form id = ${idForm} not found!`
            );
        }
}