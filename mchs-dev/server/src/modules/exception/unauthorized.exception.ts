import { Exception } from "./exception";

export abstract class UnauthorizedException extends Exception {
	public readonly type = 'authentication';
    constructor(objectOrError?: string | object | any, description?: string){
		super(objectOrError, description);}
	}