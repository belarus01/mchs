import { BadRequestException } from "src/modules/exception/bad-request.exception";

export const USER_BAD_REQUEST_ERROR_CODE = 400;

export class UserBadRequestException extends BadRequestException{
  constructor(description?: string) {
    super(
    USER_BAD_REQUEST_ERROR_CODE,
    description
    );
  } 
}