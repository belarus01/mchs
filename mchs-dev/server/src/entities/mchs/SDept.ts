import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("FK_dept1", ["idParent"], {})
@Entity("s_dept", { schema: "mchs" })
export class SDept {
  @PrimaryGeneratedColumn({ type: "int", name: "id_dept", unsigned: true })
  idDept: number;

  @Column("varchar", {
    name: "departament",
    nullable: true,
    comment: "Наименование департамента",
    length: 120,
  })
  departament: string | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "1-пожарники,0-госпромнадзор",
    width: 1,
    default: () => "'1'",
  })
  org: boolean | null;

  @Column("int", {
    name: "id_parent",
    nullable: true,
    comment: "Вышестоящая организация",
    unsigned: true,
  })
  idParent: number | null;

  @Column("varchar", {
    name: "address",
    nullable: true,
    comment: "Адрес",
    length: 250,
  })
  address: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("varchar", {
    name: "tel_head",
    nullable: true,
    comment: "Телефон начальника",
    length: 100,
  })
  telHead: string | null;

  @Column("varchar", {
    name: "tel_reception",
    nullable: true,
    comment: "Телефон приемной",
    length: 100,
  })
  telReception: string | null;

  @Column("varchar", {
    name: "tel_code",
    nullable: true,
    comment: "Код",
    length: 100,
  })
  telCode: string | null;

  @Column("varchar", {
    name: "tel_oper",
    nullable: true,
    comment: "Тел.центра оперативного управления",
    length: 100,
  })
  telOper: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внешний изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("int", {
    name: "unp_nadz_organ",
    nullable: true,
    comment: "unp надзорного органа",
    unsigned: true,
  })
  unpNadzOrgan: number | null;

  @Column("varchar", {
    name: "fio_boss",
    nullable: true,
    comment: "ФИО руководителя надзорного органа",
    length: 100,
  })
  fioBoss: string | null;

  @Column("varchar", {
    name: "dolzn_boss_nadz_org",
    nullable: true,
    length: 100,
  })
  dolznBossNadzOrg: string | null;

  @OneToMany(() => Users, (users) => users.idDept)
  users: Users[];
}
