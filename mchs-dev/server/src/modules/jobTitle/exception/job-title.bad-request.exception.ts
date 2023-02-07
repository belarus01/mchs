import { BadRequestException } from "src/modules/exception/bad-request.exception";

export const JOB_TITLE_BAD_REQUEST_ERROR_CODE = 400;

export class JobTitleBadRequestException extends BadRequestException{
    constructor(desription?: string){
        super(
            JOB_TITLE_BAD_REQUEST_ERROR_CODE,
            desription
        );
    }
}