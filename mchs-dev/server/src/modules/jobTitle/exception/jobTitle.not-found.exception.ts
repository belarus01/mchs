import { NotFoundException } from "src/modules/exception/not-found.exception";

export const JOB_TITLE_NOT_FOUND_ERROR_CODE = 404;

export class JobTitleNotFoundException extends NotFoundException{
    constructor(idDeptJob: number){
        super(
            JOB_TITLE_NOT_FOUND_ERROR_CODE,
            `Job title id = ${idDeptJob} not found!`
        )
    }
}