import { IsNotEmpty } from "class-validator";

export class CreateNotificationDTO{
    @IsNotEmpty()
    status: number;

    content: string;

    fromUid: number;

    date: Date;

    toUid: number;
}