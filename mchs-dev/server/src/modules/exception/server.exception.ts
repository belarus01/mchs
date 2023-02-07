import { Exception } from "./exception";

export abstract class ServerException extends Exception{
    public readonly type = 'server';
}