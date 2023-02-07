import { RequestValidationError } from "../validator/interface/request-validation-error";
import { Exception } from "./exception";

export abstract class BadRequestException extends Exception {
    public readonly type = 'bad_request';
    constructor(objectOrError?: string | object | any, description?: string, properties?: RequestValidationError[]){
        super(objectOrError,description, properties);
    }
}