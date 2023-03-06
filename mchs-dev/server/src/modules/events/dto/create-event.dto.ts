import { IsNotEmpty, Validate } from "class-validator";
import { Unique } from "typeorm";
import { SEvents } from "../entity/events.entity";

export class CreateEventDTO{
    @IsNotEmpty()
    //@Validate(Unique, [SEvents])//не сработал
    event: string;

    @IsNotEmpty()
    org: number;
    
    dateBegin: Date;
    dateEnd: Date;

}