import { BadRequestException } from "src/modules/exception/bad-request.exception";

export const AUTH_BAD_REQUEST_ERROR_CODE = 400;

export class AuthBadRequestException extends BadRequestException{
  constructor(description?: string) {
    super(
    AUTH_BAD_REQUEST_ERROR_CODE,
    description
    );
  } 
}