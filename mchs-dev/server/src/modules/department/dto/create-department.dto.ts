import { IsNotEmpty } from "class-validator";

export class CreateDeptDTO{
    departament?: string;

    departRod?: string;

    org?: number;

    idParent?: number;

    address?: string;

    active?: number;

    telHead?: string;

    telReception?: string;

    telCode?: string;

    telOper?: string;

    telDover?: string;

    email?: string;

    uid?: number;

    unp?: string;

    fioBoss?: string;

    dolznBossNadzOrg?: string;

    idObl?: number;

    idDeptDom?: string;

    idRayon?: number;
}