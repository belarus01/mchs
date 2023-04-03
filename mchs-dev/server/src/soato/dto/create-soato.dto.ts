import { IsNotEmpty } from "class-validator";

export class CreateSoatoDTO{
    @IsNotEmpty()
    soato: number;

    @IsNotEmpty()
    name: string;

    obl: string;

    raion: string;

    sovet: string;

    tip: string;

    gni: string;
}