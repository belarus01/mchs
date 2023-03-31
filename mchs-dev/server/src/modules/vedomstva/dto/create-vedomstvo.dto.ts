import { IsNotEmpty } from "class-validator";

export class CreateVedomstvoDTO{
    @IsNotEmpty()
    name: string;

    uid?: number;
}