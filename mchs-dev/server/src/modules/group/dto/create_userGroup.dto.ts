export interface CreateUserGroupDTO{
    idGroup: number;
    uidGr: number;//Пользователь, включенный в состав группы
    uid?: number;//Пользователь, изменивший запись
    active: number;
    dateBegin?: Date;
    dateEnd?: Date;
    typeUser: number;
    org: number;
}