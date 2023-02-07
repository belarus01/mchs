import { ServerException } from "./server.exception";
//вытянуть из класса Exceptoin в нужный модуль или...?
export const DOWNLOAD_ERROR_CODE = 5000;

export class DownloadException extends ServerException{
    constructor(url: string, inner?: any){
        super(
            DOWNLOAD_ERROR_CODE,
            `Failed to download from url = ${url}`,
            inner
        );
    }
}