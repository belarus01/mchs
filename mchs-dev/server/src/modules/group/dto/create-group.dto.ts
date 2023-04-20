import { User } from "src/modules/users/user.entity";
interface GroupUser{
    uid:number;
    uidGr:number;
    org:number;
    typeUser:number;
}

export interface CreateGroupDTO{
    name: string;
    idDept?: number;
    org: number;
    active?: number;
    uid?: number;
    users: GroupUser[];
}