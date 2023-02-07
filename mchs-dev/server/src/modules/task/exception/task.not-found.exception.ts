import { NotFoundException } from "src/modules/exception/not-found.exception";

export const TASK_NOT_FOUND_ERROR_CODE = 404;

export class TaskNotFoundException extends NotFoundException{
        constructor(idTask: number){
            super(
                TASK_NOT_FOUND_ERROR_CODE,
                `Task id = ${idTask} not found!`
            );
        }
}