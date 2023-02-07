import { IsNotEmpty } from "class-validator";

export class CreateEventDTO{
    @IsNotEmpty()
    event: string;

    @IsNotEmpty()
    org: number;
    
    dateBegin: Date;
    dateEnd: Date;

}