import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrderAdmBan } from "../events/entity/eventsOrderAdmBan.entity";
import { SEventsOrderAdmForce } from "../events/entity/eventsOrderAdmForce.entity";
import { SEventsOrderObj } from "../events/entity/eventsOrderObj.entity";
import { SSubj } from "../subject/entity/subject.entity";
import { User } from "../users/user.entity";

@Index("id_subj", ["idSubj"], {})
@Index("s_subj_obj_FK_1", ["uid"], {})
@Index("s_subj_obj_FK_2", ["idTypeDanger"], {})
@Index("s_subj_obj_FK_31", ["soatoCode"], {})
@Entity("s_subj_obj", { schema: "mchs" })
export class SSubjObj {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_obj", unsigned: true })
  idObj: number;

  @Column("bigint", { name: "id_subj", unsigned: true })
  idSubj: number;

  @Column("tinyint", {
    name: "id_type_danger",
    comment: "тип опасности",
    unsigned: true,
    default: () => "'1'",
  })
  idTypeDanger: number;

  @Column("text", { name: "note", nullable: true, comment: "Примечание" })
  note: string | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "УНП",
    length: 25,
  })
  unp: string | null;

  @Column("varchar", {
    name: "addr_obj",
    nullable: true,
    comment:
      "Место нахождения oбъекта проверяемого субъекта (промышленной безопасности)",
    length: 550,
  })
  addrObj: string | null;

  @Column("varchar", {
    name: "addr_descr",
    nullable: true,
    comment: "Место осуществления деятельности (уточнение)",
    length: 254,
  })
  addrDescr: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалена,1-действует",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя,изменившего запись",
    unsigned: true,
  })
  uid: number | null;

  @Column("bigint", {
    name: "soato_code",
    nullable: true,
    comment: "местонахождения  объекта s_ate_reestr",
    unsigned: true,
  })
  soatoCode: number | null;

  @Column("int", {
    name: "id_reestr",
    nullable: true,
    comment:
      "Уникальный идентификатор объекта (город, деревня…) Реестр АТЕ и ТЕ",
    unsigned: true,
  })
  idReestr: number | null;

  @Column("bigint", {
    name: "id_street",
    nullable: true,
    comment: "поле id_street таблицы s_ate_street",
    unsigned: true,
  })
  idStreet: number | null;

  @Column("varchar", {
    name: "name_obj",
    nullable: true,
    comment: "наименование объекта",
    length: 50,
  })
  nameObj: string | null;

  @Column("varchar", {
    name: "fio_fireman",
    nullable: true,
    comment:
      "Инициалы служащего, контактн.телефон должн.лица, ответственного за обеспеч.пож.безоп.",
    length: 250,
  })
  fioFireman: string | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-госпромнадзор,1-пожарники",
    unsigned: true,
    default: () => "'0'",
  })
  org: number | null;

  @Column("varchar", {
    name: "num_opo",
    nullable: true,
    comment: "Номер ОПО (для надзорников, org=0)",
    length: 85,
  })
  numOpo: string | null;

  @OneToMany(
    () => SEventsOrderAdmBan,
    (sEventsOrderAdmBan) => sEventsOrderAdmBan.idObj2
  )
  sEventsOrderAdmBans: SEventsOrderAdmBan[];

  @OneToMany(
    () => SEventsOrderAdmForce,
    (sEventsOrderAdmForce) => sEventsOrderAdmForce.idObj2
  )
  sEventsOrderAdmForces: SEventsOrderAdmForce[];

  @OneToMany(() => SEventsOrderObj, (sEventsOrderObj) => sEventsOrderObj.idObj2)
  sEventsOrderObjs: SEventsOrderObj[];

  @ManyToOne(() => User, (users) => users.sSubjObjs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: User;

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sSubjObjs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
  idSubj2: SSubj;
}
