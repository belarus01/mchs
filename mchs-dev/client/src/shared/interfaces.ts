import { number } from "yup";

export interface User {
    uid: number;
    user: string;
    lName: string;
    fName: string;
    sName: string;
    idDept: number;
    idDeptUnits: number;
    idDeptJob: number;
    userRole: number;
    email: string;
    tel: string;
    active: number;
    dateRecord: Date;
    uidAdm: number;
    lastLogin: Date;
    loginAttempts: number;
    objRights: number;
    sSubjObjs: SSubjObj[];
    idDept2: SDept;
    idDeptJob2: SDeptJob;
    //sPermissions: SPermissions[];
}
export interface CreateUserDTO{
    login?: string;
    password: string;
    fName?: string;
    sName?: string;
    lName?: string;
    tel?: string;
    idDept?: number;
    idDeptUnits: number;
    idDeptJob: number;
    email?: string;
    position?: string;
    role?:number;
    uidAdm?: number;
}

export interface DeleteUserDTO{
    uid?: number;
    adminUid?: number;
}
export interface UserDTO{
    uid: number;
    login: string;
    lName: string | null;
    fName: string;
    sName: string | null;
    idDept: number | null;
    idDeptUnits: number | null;
    idDeptJob: number | null;
    userRole: number;
    email: string | null;
    tel: string | null;
    active: number;
    dateRecord: Date | null;
    uidAdm: number;
    lastLogin: Date | null;
    loginAttempts: number | null;
    objRights: number;
}

export interface LoginRequest{
    login: string;
    password: string;
}

export interface LoginResponce{
    token: string;
    user: User;
}

export interface SDeptJob{
    idDeptJob: number;
    job: string;
    dateRecord: Date | null;
    uid: number | null;
    active: number;
    org: number | null;
    users: User[];
}

export interface SDept{
    idDept: number;
    departament: string;
    org: number;
    idParent: number;
    address: string;
    dateRecord: string | null;
    active: number;
    telHead: string | null;
    telReception: string | null;
    telCode: string | null;
    telOper: string | null;
    email: string | null;
    uid: number | null;
    unpNadzOrgan: number | null;
    fioBoss: string | null;
    dolznBossNadzOrg: string | null;
    users: User[];
    value: number;
}

export interface SDeptNode{
    idDept: number;
    departament: string;
    org: number;
    idParent: number;
    uid: number | null;
    children: SDeptNode[];
}

export interface SSubjObj{
    idSubj: number;
    numOpo: string | null;
    subj: string | null;
    unp: string | null;
    addrYur: string | null;
    dateRecord: string | null;
    active: number;
    uid: number | null;
    codeSoatoYur: string | null;
    numReg: string | null;
    idOked: number | null;
    dateRegOpo: string | null;
    dateRegUnp: string | null;
    addrFact: string | null;
    bossName: string | null;
    staffBoss: string | null;
    numBuild: number | null;
    nameBuild: string | null;
    statusUnp: string | null;
    dateLikv: string | null;
    typeSubj: string | null;
    bankRekv: string | null;
    idReestrYur: number | null;
    idStreetYur: string | null;
    numCorpYur: string | null;
    numBuildYur: string | null;
    codeSoatoFact: string | null;
    idReestrFact: number | null;
    idStreetFact: string | null;
    numCorpFact: string | null;
    numBuildFact: string | null;
    contactData: string | null;
    //codeSoatoYur2: SSoato;
    sSubjObjs: SSubjObj[]; 
}

export interface GeolocationDTO{
    idLocation: number;
    uid:number;
    latitude:string;
    longitude:string;
    dateRecord:string;
}

export interface GeolocationData{
    uid?:number;
    latitude?:string;
    longitude?:string;
    dateRecord?:string;
}

export interface SSubj{
    idSubj: number;
    numOpo: string | null;
    subj: string | null;
    unp: string | null;
    addrYur: string | null;
    dateRecord: Date | null;
    active: number;
    uid: number | null;
    codeSoatoYur: string | null;
    numReg: string | null;
    idOked: number | null;
    dateRegOpo: string | null;
    dateRegUnp: string | null;
    addrFact: string | null;
    bossName: string | null;
    staffBoss: string | null;
    numBuild: number | null;
    nameBuild: string | null;
    statusUnp: string | null
    dateLikv: string | null;
    typeSubj: string | null;
    bankRekv: string | null;
    idReestrYur: number | null;
    idStreetYur: string | null;
    numCorpYur: string | null;
    numBuildYur: string | null;
    codeSoatoFact: string | null;
    idReestrFact: number | null;
    idStreetFact: string | null;
    numCorpFact: string | null;
    numBuildFact: string | null;
    contactData: string | null;
    sSubjObjs: SSubjObj[]; 
}

export interface SSoato{
    soato: string;
    name: string;
    obl: string | null;
    raion: string | null;
  
    sovet: string | null;
  
    tip: string | null;
  
    gni: string | null;
  
    datav: string | null;
  
    soaton: string | null;
  
    datel: string | null;
  
    mal: string | null;
  
    idSoato: string;
  
    sSubjs: SSubj[];
  }

  export interface SEvents{
    idEvent: number;
    event: string | null;
    numEvent: number | null;
    org: number | null;
    dateBegin: Date | null;
    dateEnd: Date | null;
    dateRecord: Date | null;
    active: number;
    status: string | null; //wait/in_progress/ended
    data: string | null;
    uid: number | null;
}

export interface cpuResponse{
    percentage: number;
}

export interface MemoryResponse{
    status: string;
    errors: string;
}

export interface MemorySizeResponse{
    size:string;
    used:string;
    free:string;
    percentage: string;
}