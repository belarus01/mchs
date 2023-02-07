import { ValidationError } from "class-validator";
import { RequestValidationError } from "./interface/request-validation-error";
import { BadRequestException } from "src/modules/exception/bad-request.exception"

const mapError = (error: ValidationError): RequestValidationError => ({
    properties: [error.property],
    errors: error.constraints,
    nested: error.children.map(mapError)
});

export const VALIDATION_ERROR_CODE = 4003;

export class ValidationException extends BadRequestException {
    constructor(errors: ValidationError[]){
        super(
            VALIDATION_ERROR_CODE,
            'Validation failed!',
            errors.map(mapError)
        );
    }
}