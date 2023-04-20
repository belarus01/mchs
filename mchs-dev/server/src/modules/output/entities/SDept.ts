import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SAteObl } from "./SAteObl";
import { SAteRayon } from "./SAteRayon";
import { SEventsOrder } from "./SEventsOrder";
import { SEventsPlan } from "./SEventsPlan";
import { Users } from "./Users";

@Index("FK_dept1", ["idParent"], {})
@Index("FK_s_dept_id_obl", ["idObl"], {})
@Index("FK_s_dept_id_rayon", ["idRayon"], {})
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

  @Column("varchar", {
    name: "depart_rod",
    nullable: true,
    comment: "В род.падеже (для документов)",
    length: 255,
  })
  departRod: string | null;

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

  @Column("varchar", {
    name: "tel_dover",
    nullable: true,
    comment: "Телефон доверия",
    length: 55,
  })
  telDover: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внешний изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "unp надзорного органа",
    length: 55,
  })
  unp: string | null;

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

  @Column("int", { name: "id_obl", nullable: true })
  idObl: number | null;

  @Column("varchar", { name: "id_dept_dom", nullable: true, length: 25 })
  idDeptDom: string | null;

  @Column("int", { name: "id_rayon", nullable: true })
  idRayon: number | null;

  @ManyToOne(() => SAteObl, (sAteObl) => sAteObl.sDepts, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_obl", referencedColumnName: "idObl" }])
  idObl2: SAteObl;

  @ManyToOne(() => SAteRayon, (sAteRayon) => sAteRayon.sDepts, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_rayon", referencedColumnName: "idRayon" }])
  idRayon2: SAteRayon;

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idDept2)
  sEventsOrders: SEventsOrder[];

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idDeptIss2)
  sEventsOrders2: SEventsOrder[];

  @OneToMany(() => SEventsPlan, (sEventsPlan) => sEventsPlan.idDept2)
  sEventsPlans: SEventsPlan[];

  @OneToMany(() => Users, (users) => users.idDept)
  users: Users[];
}
