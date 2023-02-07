import { HttpException, Injectable,  } from "@nestjs/common";
import { ErrorHandler, Type } from "@nestjs/common/interfaces";
import { Injector } from "@nestjs/core/injector/injector";
import { Router } from "express";
//import { NotificationService } from "../notification/notification.service";


/* 
@Injectable()
export class ErrorsHandler implements ErrorHandler{
    constructor(private injector: Injector){}

    handleError(error: Error| HttpException){
        const notificationService = this.injector.getClassDependencies<NotificationService>(NotificationService);
        const notificationService0 = this.injector.get(NotificationService);
        const errorService = this.injector.get(ErrorService);
        const router = this.injector.get(Router);

        if(error instanceof HttpException){//Server errror happend
            if(!navigator.onLine){
                return notificationService.notify('No Internet Connection')
            } 

            //http error, send the error to the server
            errorService.log(error).subscribe();
            //show notification to the user
            return notificationService.notify('${error.status} - ${error.message}');
        } else{//Client error happend
            //send the error to the server to the server and then redirect the user to the page with all the info
            errorService
          .log(error)
          .subscribe(errorWithContextInfo => {
            router.navigate(['/error'], { queryParams: errorWithContextInfo });
          });
        }

    }
} */