import { DynamicModule, Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "../filter/all-exceptions.filter";

@Module({})
export class ExceptionModule {
    public static forRoot (): DynamicModule {
        return {
            module: ExceptionModule,
            providers: [
                {
                    provide: APP_FILTER,
                    useClass: AllExceptionsFilter
                },
            ]
        };
    }
}
