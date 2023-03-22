import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SChlistTnpa } from "./SChlistTnpa";
import { SSubjObj } from "./SSubjObj";
import { UserPermissions } from "./UserPermissions";
import { SDept } from "./SDept";
import { SDeptJob } from "./SDeptJob";

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
  active: boolean;

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

  @Column("varchar", { name: "pass_sha256", nullable: true, length: 65 })
  passSha256: string | null;

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
  idDept: SDept;

  @ManyToOne(() => SDeptJob, (sDeptJob) => sDeptJob.users, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_dept_job", referencedColumnName: "idDeptJob" }])
  idDeptJob: SDeptJob;
}
