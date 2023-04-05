import { NotFoundException } from "src/modules/exception/not-found.exception";

export const TYPE_TEST_NOT_FOUND_ERROR_CODE = 404;

export class TypeTestNotFoundException extends NotFoundException{
        constructor(idTypeTest: number){
            super(
                TYPE_TEST_NOT_FOUND_ERROR_CODE,
                `TypeTest id = ${idTypeTest} not found!`
            );
        }
}