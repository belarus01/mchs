import { IsNotEmpty } from "class-validator";

export class CreateNotificationDTO{
    @IsNotEmpty()
    status: number;

    content: string;

    uid: number;

    date: Date;
}