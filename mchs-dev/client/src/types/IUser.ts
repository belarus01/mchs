export default interface IUser {
    uid: number
    login: string;
    password: string;
    fName: string;
    sName: string;
    lName: string;
    idDeptUnits: number;
    idDeptJob: number;
    userRole: number;
    tel: string;
    email: string;
    active: number;
    position: string;
    role: string;
    status: boolean;
    statusStr: string;
}