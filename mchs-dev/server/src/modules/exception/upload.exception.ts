import { ServerException } from "./server.exception";

export const UPLOAD_ERROR_CODE = 5000;

export class UploadException extends ServerException{
    constructor(url: string, inner?: any){
       super(
        UPLOAD_ERROR_CODE,
        `Failed to upload from ${url}`,
        inner
       ); 
    }
}