import { NotFoundException } from "src/modules/exception/not-found.exception";

export const DEPT_UNIT_NOT_FOUND_ERROR_CODE = 404;

export class DeptUnitNotFoundException extends NotFoundException{
    constructor(idDeptUnits: number){
        super(
            DEPT_UNIT_NOT_FOUND_ERROR_CODE,
            `Department Unit id = ${idDeptUnits} not found!`
        );
    }
}