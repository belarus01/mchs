import { IsNotEmpty } from "class-validator";

export class CreateDeptDTO{
    @IsNotEmpty()
    departament: string;

    org: number;
    address: string;

    active?: number;

    telHead?: string;
    telReception?: string;
    telCode?: string;
    telOper?: string;
    email?: string;
    uid?: number;
    unpNadzOrgan?: number;
    fioBoss?: string;
    dolznBossNadzOrg?: string;

}