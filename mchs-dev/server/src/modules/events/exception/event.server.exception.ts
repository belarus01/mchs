import { ServerException } from "src/modules/exception/server.exception";

export const EVENT_SERVER_EXCEPTION = 5000;

export class EventServerException extends ServerException{
    constructor(description?: string){
        super(
            EVENT_SERVER_EXCEPTION,
            `Server error in event module occured`,
            description
        );
    }
}