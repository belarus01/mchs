import { BadRequestException } from "src/modules/exception/bad-request.exception";

export const EVENT_BAD_REQUEST_ERROR_CODE = 400;

export class EventBadRequestException extends BadRequestException{
    constructor(description?: string) {
        super(
        EVENT_BAD_REQUEST_ERROR_CODE,
        description
        );
      } 
}