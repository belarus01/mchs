import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import * as fs from 'fs';
import { Request, Response } from 'express';
import { CustomHttpExceptionResopnse, HttpExceptionResponse } from "../exception/interface/http-exception-response.interface";
import { GetUserInfoRequest } from "../users/user-info.request";
import { Exception } from "../exception/exception";
import { EMPTY } from "rxjs";

const typesMap = new Map<string, number>()
    .set('authentication', 401)//the request has not been applied because the server requires user authentication | UnauthorizedException
    .set('authorization', 403)//does not have rights to access the content | ForbiddenException
    .set('not_found', 404)// | NotFoundException
    .set('not_allowed', 405)//the server knows the request method, the method has been Disabled and can not be used | MethodNotAllowedException
    .set('request_timeout', 408)//the server did not receive a complete request in the time that it prepared to wait | RequestTimeoutException 
    .set('bad_request', 400)//the server could not understand the request because of invalid syntax | BadRequestException
    .set('server', 500)// | InternalServerErrorException
    .set('unexpected', 400);/* if smbd forgotten to create approriate to err, part of our own Exception class, class |UnexpectedExcepion*/


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: Exception, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const req = context.getRequest<GetUserInfoRequest>();

        //let status: HttpStatus;
        let status = typesMap.get(exception.type);
        let errorMessage: string;

        if (host.getType() === 'http') { // делать что-то только в контексте обычных HTTP-запросов (REST) 
            const errorResponse = host.switchToHttp().getResponse();
            const status = typesMap.get(exception.type) || 500;
            errorMessage =
                (errorResponse as HttpExceptionResponse).error || exception.message;
        } else {
            status = 500;
            errorMessage = 'Internal server error occurred';
        }

        const errorResponse = this.getErrorResponse(exception, status, errorMessage, request);
        const errorLog = this.getErrorLog(errorResponse, req, exception);
        this.writeErrorLogToFile(errorLog);
        response.status(status).json(errorResponse);
    }


    private getErrorResponse = (
        //status: HttpStatus,
        exception: Exception,
        status = typesMap.get(exception.type),
        errorMessage: string,
        request: Request,
    ): CustomHttpExceptionResopnse => ({
        statusCode: status,
        error: errorMessage,
        path: request.url,
        method: request.method,
        timeStamp: new Date(),//dive deep more! bcs it outputs the wrong time((
    });

    private getErrorLog = (
        errorResponse: CustomHttpExceptionResopnse,
        //request: Request,
        req: GetUserInfoRequest,
        exception: unknown,

    ): string => {
        const { statusCode, error } = errorResponse;
        const { method, url } = req;
        const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n\n
            ${JSON.stringify(errorResponse)}\n\n
            User: ${JSON.stringify(req.user ?? 'Not signed in')}\n\n
            ${exception instanceof HttpException ? exception.stack : error}\n\n`;
        return errorLog;
    };

    private writeErrorLogToFile = (errorLog: string): void => {
        fs.appendFile('error.log', errorLog, 'utf8', (err) => { //file for error logging
            if (err) throw err;
        });
    };

}