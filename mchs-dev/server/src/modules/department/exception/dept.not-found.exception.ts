import { NotFoundException } from "src/modules/exception/not-found.exception";

export const DEPT_NOT_FOUND_ERROR_CODE = 404;

export class DeptNotFoundException extends NotFoundException{
    constructor(idDept: number){
        super(
            DEPT_NOT_FOUND_ERROR_CODE,
            `Department id = ${idDept} not found!`
        );
    }
}