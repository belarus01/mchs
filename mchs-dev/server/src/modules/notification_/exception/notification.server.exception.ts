import { ServerException } from "src/modules/exception/server.exception";

export const NOTIFICATION_SERVER_ERROR_CODE = 500;

export class NotificationServerException extends ServerException{
    constructor(description?: string){
        super(
            NOTIFICATION_SERVER_ERROR_CODE,
            description
        );
    }
}