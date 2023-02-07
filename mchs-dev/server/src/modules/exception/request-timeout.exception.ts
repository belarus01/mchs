import { Exception } from "./exception";

//When your endpoint doesn't return anything after a period of time
export class RequestTimeoutException extends Exception{
    public readonly type = 'request_timeout';
}