import { Exception } from "./exception";

export abstract class ForbiddenException extends Exception {
	public readonly type = 'authorization';
    constructor(objectOrError?: string | object | any, description?: string){
		super(objectOrError, description);}
	}