import { NotFoundException } from "src/modules/exception/not-found.exception";

export const SUBJECT_NOT_FOUND_ERROR_CODE = 404;

export class SubjectNotFoundException extends NotFoundException{
        constructor(idSubj: number){
            super(
                SUBJECT_NOT_FOUND_ERROR_CODE,
                `Subject id = ${idSubj} not found!`
            );
        }
}