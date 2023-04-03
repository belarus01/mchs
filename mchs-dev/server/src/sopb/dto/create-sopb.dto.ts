import { IsNotEmpty } from "class-validator";

export class CreateSopbDTO{
    @IsNotEmpty()
    name: string;

    conditions: string;

    uid?: number;
}