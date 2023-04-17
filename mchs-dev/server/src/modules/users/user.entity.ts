import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SChlistTnpa } from "../chlist/entity/chlistTnpa.entity";
import { SDept } from "../department/entity/department.entity";
import { SDeptJob } from "../jobTitle/jobTitle.entity";
import { Notification } from "../notification/notification.entity";
import { SSubjObj } from "../object/entity/object.entity";
import { UserPermissions } from "../permission/entity/userPermission.entity";
//import { UserGroup } from "../userGroup/user-group.entity";
import { SEventsPrivate } from "../events/entity/eventsPrivate.entity";
import { UserGroup } from "../group/entity/userGroup.entity";

@Index("IDX_a894a560d274a270f087c72ba0", ["user"], { unique: true })
@Entity("users", { schema: "mchs" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "uid", unsigned: true })
  uid: number;

 
  @Column("varchar", {
    name: "user",
    unique: true,
    comment: "логин",
    length: 45,
  })
  user: string;

  @Column("varchar", {
    name: "l_name",
    nullable: true,
    comment: "фамилия",
    length: 100,
  })
  lName: string | null;


  @Column("varchar", { name: "f_name", comment: "имя", length: 255 })
  fName: string;

  @Column("varchar", {
    name: "s_name",
    nullable: true,
    comment: "отчество",
    length: 100,
  })
  sName: string | null;

  @Column("varchar", {
    name: "fio",
    nullable: true,
    comment: "ФИО",
    length: 255,
  })
  fio: string | null;

  @Column("int", {
    name: "id_dept_units",
    nullable: true,
    comment: "Наименование структурного подразделения",
    unsigned: true,
  })
  idDeptUnits: number | null;

  @Column("int", {
    name: "id_dept_job",
    nullable: true,
    comment: "должность",
    unsigned: true,
  })
  idDeptJob: number | null;

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
  idDept: number | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "tel", nullable: true, length: 255 })
  tel: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "2-неакт.1-актвн.0-заблокирован",
    width: 1,
    default: () => "'0'",
  })
  active: number;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата внесения изменений",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid_adm",
    comment: "Админ, что внес изменения",
    unsigned: true,
  })
  uidAdm: number;

  @Column("datetime", { name: "last_login", nullable: true })
  lastLogin: Date | null;

  @Column("tinyint", {
    name: "login_attempts",
    nullable: true,
    comment: "кол-во попыток входа",
    default: () => "'0'",
  })
  loginAttempts: number | null;

  @Column("tinyint", {
    name: "obj_rights",
    comment: "Права управления объектами по битам: add,edit,del",
    unsigned: true,
  })
  objRights: number;

  @Column("int", {
    name: "user_role",
    comment: "1-гл.админ,2-адм.подраздел- 3-руководитль подр. 4-пользователь",
    unsigned: true,
    default: () => "'4'",
  })
  userRole: number;

  @Column("varchar", { name: "pas", length: 128 })
  pas: string;

  @Column("varchar", {
    name: "pass_sha256",
    nullable: true,
    comment: "Хэш пароля",
    length: 65,
  })
  passSha256: string | null;

  @Column("varchar", {
    name: "pass_sha256_1",
    nullable: true,
    comment: "Хэш пердыдущего пароля ",
    length: 65,
  })
  passSha256_1: string | null;

  @Column("varchar", {
    name: "pass_sha256_2",
    nullable: true,
    comment: "Хэш пароля, предыдущего pass_sha256_1",
    length: 65,
  })
  passSha256_2: string | null;

  @Column("varchar", {
    name: "pass_sha256_3",
    nullable: true,
    comment: "Хэш пароля, предыдущего pass_sha256_2",
    length: 65,
  })
  passSha256_3: string | null;

  @Column("tinyint", {
    name: "fl_pass",
    nullable: true,
    comment:
      "Флаг назначения пароля: 0-назначен админом,1-изменен пользователем",
    unsigned: true,
    default: () => "'0'",
  })
  flPass: number | null;

  @OneToMany(() => SChlistTnpa, (sChlistTnpa) => sChlistTnpa.u)
  sChlistTnpas: SChlistTnpa[];

  @OneToMany(() => SSubjObj, (sSubjObj) => sSubjObj.u)
  sSubjObjs: SSubjObj[];

  @OneToMany(() => UserPermissions, (userPermissions) => userPermissions.u)
  userPermissions: UserPermissions[];

  @ManyToOne(() => SDept, (sDept) => sDept.users, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_dept", referencedColumnName: "idDept" }])
  idDept2: SDept;

  @ManyToOne(() => SDeptJob, (sDeptJob) => sDeptJob.users, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_dept_job", referencedColumnName: "idDeptJob" }])
  idDeptJob2: SDeptJob;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.uidGr2, {cascade: true})
  userGroups: UserGroup[];

  @OneToMany(() => Notification, (notification) => notification.toU)
  notifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.fromU)
  notifications2: Notification[];

  @OneToMany(() => SEventsPrivate, (sEventsPrivate) => sEventsPrivate.u)
  sEventsPrivates: SEventsPrivate[];
}
