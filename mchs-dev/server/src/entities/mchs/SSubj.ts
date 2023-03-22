import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./SEventsOrder";
import { SVedomstva } from "./SVedomstva";
import { SSubjObj } from "./SSubjObj";

@Index("num_opo", ["numOpo"], {})
@Index("s_subj_FK", ["codeSoatoYur"], {})
@Index("s_subj_FK_1", ["idOked"], {})
@Index("FK_s_subj_id_ved", ["idVed"], {})
@Entity("s_subj", { schema: "mchs" })
export class SSubj {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_subj", unsigned: true })
  idSubj: string;

  @Column("varchar", {
    name: "num_opo",
    nullable: true,
    comment:
      "Индивидуальный номер ОПО согласно государственному реестру опасных производственных объектов",
    length: 50,
  })
  numOpo: string | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "УНП",
    length: 25,
  })
  unp: string | null;

  @Column("varchar", {
    name: "subj",
    nullable: true,
    comment: "Наименование oбъекта промышленной безопасности(cубъект)",
    length: 250,
  })
  subj: string | null;

  @Column("varchar", {
    name: "addr_yur",
    nullable: true,
    comment: "Юридический адрес субъекта",
    length: 550,
  })
  addrYur: string | null;

  @Column("int", {
    name: "id_ved",
    nullable: true,
    comment: "Ведомственная принадлежность",
    unsigned: true,
  })
  idVed: number | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата свидетельства о регистрации ОПО",
  })
  dateRecord: string | null;

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
    name: "code__soato_yur",
    nullable: true,
    comment:
      "Код СОАТО (из реестра) населенного пункта (нас.пункт юридического адреса)",
    unsigned: true,
  })
  codeSoatoYur: string | null;

  @Column("varchar", {
    name: "num_reg",
    nullable: true,
    comment: "Номер свидетельства о регистрации ОПО",
    length: 15,
  })
  numReg: string | null;

  @Column("int", {
    name: "id_oked",
    nullable: true,
    comment: "ВЭД",
    unsigned: true,
  })
  idOked: number | null;

  @Column("date", {
    name: "date_reg_opo",
    nullable: true,
    comment: "Дата регистрации ОПО",
  })
  dateRegOpo: string | null;

  @Column("date", {
    name: "date_reg_unp",
    nullable: true,
    comment: "Дата государственной регистрации (присвоения УНП)",
  })
  dateRegUnp: string | null;

  @Column("varchar", {
    name: "addr_fact",
    nullable: true,
    comment: "Фактический адрес субъекта",
    length: 500,
  })
  addrFact: string | null;

  @Column("varchar", {
    name: "boss_name",
    nullable: true,
    comment: "Ф.И.О руководителя субъекта",
    length: 200,
  })
  bossName: string | null;

  @Column("varchar", {
    name: "staff_boss",
    nullable: true,
    comment: "Должность руководителя субъекта (объекта)",
    length: 250,
  })
  staffBoss: string | null;

  @Column("varchar", {
    name: "boss_tel",
    nullable: true,
    comment: "Телефоны руководителя",
    length: 255,
  })
  bossTel: string | null;

  @Column("varchar", {
    name: "chief_name",
    nullable: true,
    comment: "ФИО главбуха",
    length: 200,
  })
  chiefName: string | null;

  @Column("varchar", {
    name: "staff_chief",
    nullable: true,
    comment: "Должность главбуха",
    length: 255,
  })
  staffChief: string | null;

  @Column("varchar", {
    name: "chief_tel",
    nullable: true,
    comment: "Телефоны главбуха",
    length: 255,
  })
  chiefTel: string | null;

  @Column("int", {
    name: "num_build",
    nullable: true,
    comment: "Количество отдельных зданий",
    unsigned: true,
  })
  numBuild: number | null;

  @Column("varchar", {
    name: "name_build",
    nullable: true,
    comment: "Наименование отдельных зданий",
    length: 500,
  })
  nameBuild: string | null;

  @Column("varchar", {
    name: "status_unp",
    nullable: true,
    comment: "Состояние плательщика(действущий, в стадии ликвидации....)",
    length: 100,
  })
  statusUnp: string | null;

  @Column("date", {
    name: "date_likv",
    nullable: true,
    comment: "Дата ликвидации",
  })
  dateLikv: string | null;

  @Column("varchar", {
    name: "type_subj",
    nullable: true,
    comment: "тип плательщика 0-юр.1-физ.",
    length: 100,
  })
  typeSubj: string | null;

  @Column("varchar", {
    name: "bank_rekv",
    nullable: true,
    comment: "Реквизиты текущего (расчетного) и иных счетов",
    length: 100,
  })
  bankRekv: string | null;

  @Column("int", {
    name: "id_reestr_yur",
    nullable: true,
    comment: "поле id_reestr таблицы s_ate_reestr",
    unsigned: true,
  })
  idReestrYur: number | null;

  @Column("bigint", {
    name: "id_street_yur",
    nullable: true,
    comment: " поле id_street таблицы s_ate_street",
    unsigned: true,
  })
  idStreetYur: string | null;

  @Column("varchar", {
    name: "num_corp_yur",
    nullable: true,
    comment: "Номер корпуса для юридического адреса",
    length: 20,
  })
  numCorpYur: string | null;

  @Column("varchar", {
    name: "num_build_yur",
    nullable: true,
    comment: "Номер дома для юридического адреса",
    length: 20,
  })
  numBuildYur: string | null;

  @Column("bigint", {
    name: "code__soato_fact",
    nullable: true,
    comment:
      "Код СОАТО фактического адреса\r\nКод СОАТО (из реестра) населенного пункта (нас.пункт фактического адреса)",
    unsigned: true,
  })
  codeSoatoFact: string | null;

  @Column("int", {
    name: "id_reestr_fact",
    nullable: true,
    comment:
      "Уникальный идентификатор объекта (город, деревня…) Реестр АТЕ и ТЕ",
    unsigned: true,
  })
  idReestrFact: number | null;

  @Column("bigint", {
    name: "id_street_fact",
    nullable: true,
    comment: "поле id_street таблицы s_ate_street",
    unsigned: true,
  })
  idStreetFact: string | null;

  @Column("varchar", {
    name: "num_corp_fact",
    nullable: true,
    comment: "Номер корпуса",
    length: 20,
  })
  numCorpFact: string | null;

  @Column("varchar", {
    name: "num_build_fact",
    nullable: true,
    comment: "Номер дома фактического адреса",
    length: 20,
  })
  numBuildFact: string | null;

  @Column("varchar", {
    name: "contact_data",
    nullable: true,
    comment: "Контактные данные (телефон, факс, адрес электронной почты)",
    length: 100,
  })
  contactData: string | null;

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idSubj2)
  sEventsOrders: SEventsOrder[];

  @ManyToOne(() => SVedomstva, (sVedomstva) => sVedomstva.sSubjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_ved", referencedColumnName: "idVed" }])
  idVed2: SVedomstva;

  @OneToMany(() => SSubjObj, (sSubjObj) => sSubjObj.idSubj2)
  sSubjObjs: SSubjObj[];
}
