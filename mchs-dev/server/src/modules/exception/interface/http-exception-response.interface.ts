export interface HttpExceptionResponse {
    statusCode: number;
    error: string;
}

export interface CustomHttpExceptionResopnse extends HttpExceptionResponse{
    path: string;
    method: string;
    timeStamp: Date;
}