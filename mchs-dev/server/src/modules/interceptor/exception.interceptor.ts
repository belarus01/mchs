import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";
import { Exception } from "../exception/exception";
import { UnexpectedException } from "../exception/unexpected.exception"; 
/*интерцептор, который все ошибки не являющиеся экземпляром наследников Exception
 заворачивает в new UnexpectedException(error) и прокидывает дальше*/

@Injectable()
export class ExceptionInterceptor implements  NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
          catchError(err => {
            if (!(err instanceof Exception)) {
              return throwError(() => new UnexpectedException(400, 'Unexpected Exception, not extends the Exception class'));
            }
            return throwError(() => err);
          }),
        );
    }
    
}