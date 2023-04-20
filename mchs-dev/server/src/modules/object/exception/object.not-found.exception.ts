import { NotFoundException } from "src/modules/exception/not-found.exception";

export const OBJECT_NOT_FOUND_ERROR_CODE = 404;

export class ObjectNotFoundException extends NotFoundException{
        constructor(description?: string){
            super(
                OBJECT_NOT_FOUND_ERROR_CODE,
                description
                //`Object .. id = ${id..} not found!`
            );
        }
}