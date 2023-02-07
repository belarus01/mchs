import { ForbiddenException } from "@nestjs/common"
import {  } from "src/modules/exception/forbidden.exception"

export const USER_FORBIDDEN_ERROR_CODE = 403;//p. s. there can be any code

export class UserForbiddenException extends ForbiddenException{
    constructor(uidAdm: number){// или все же uid принимать...? 
        super(
            USER_FORBIDDEN_ERROR_CODE,
            `User id = ${uidAdm} is not allowed`
        )
    }
}

/*export const EMPLOYEE_NOT_ALLOWED_ERROR_CODE = 40565;// Пример классный,НО вместо нот аллауд должен быть ForbiddenException

export class EmployeeNotAllowedException extends NotAllowedException {
  constructor (userId: number, employeeId: number) {
  	super(
      EMPLOYEE_NOT_ALLOWED_ERROR_CODE,
      `User id = ${userId} is not allowed to query employee id = ${employeeId}!`
    );
  }
}*/