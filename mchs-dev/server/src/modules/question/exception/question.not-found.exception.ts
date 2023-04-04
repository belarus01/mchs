import { NotFoundException } from "src/modules/exception/not-found.exception";

export const QUESTION_NOT_FOUND_ERROR_CODE = 404;

export class QuestionNotFoundException extends NotFoundException{
        constructor(idQue: number){
            super(
                QUESTION_NOT_FOUND_ERROR_CODE,
                `Question id = ${idQue} not found!`
            );
        }
}