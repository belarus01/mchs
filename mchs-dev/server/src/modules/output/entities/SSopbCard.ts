import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SSopb } from "./SSopb";
import { SSopbCardSubj } from "./SSopbCardSubj";
import { SSopbCardUid } from "./SSopbCardUid";

@Index("FK_s_sopb_card_id_sopb", ["idSopb"], {})
@Index("FK_s_sopb_card_uid2", ["uid"], {})
@Index("FK_s_sopb_card_id_dept_request", ["idDeptRequest"], {})
@Entity("s_sopb_card", { schema: "doc" })
export class SSopbCard {
  @PrimaryGeneratedColumn({ type: "int", name: "id_card", unsigned: true })
  idCard: number;

  @Column("int", {
    name: "id_sopb",
    comment: "Наименование продукции в соответствии с перечнем ТР ЕФС 043/2017",
    unsigned: true,
  })
  idSopb: number;

  @Column("varchar", {
    name: "num_doc",
    nullable: true,
    comment: "Номер документа об оценке соответствия (сертификат соответствия)",
    length: 25,
  })
  numDoc: string | null;

  @Column("date", {
    name: "date_doc",
    nullable: true,
    comment: "Дата документа об оценке соответствия",
  })
  dateDoc: string | null;

  @Column("date", {
    name: "date_from",
    nullable: true,
    comment: "Дата начала действия документа об оценке соответствия",
  })
  dateFrom: string | null;

  @Column("date", {
    name: "date_to",
    nullable: true,
    comment: "Дата окончания действия документа об оценке соответствия",
  })
  dateTo: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment:
      "Наименование продукции, указанное в документе об оценке соответствия",
    length: 250,
  })
  name: string | null;

  @Column("varchar", {
    name: "brend",
    nullable: true,
    comment: "Марка СОПБиП",
    length: 85,
  })
  brend: string | null;

  @Column("varchar", {
    name: "model",
    nullable: true,
    comment: "Модель СОПБиП",
    length: 85,
  })
  model: string | null;

  @Column("varchar", {
    name: "mnf_data",
    nullable: true,
    comment:
      "Информ.об изготовителе, указанная в документе об оценке соответствия (4)",
    length: 255,
  })
  mnfData: string | null;

  @Column("varchar", {
    name: "status_doc",
    nullable: true,
    comment: "Статус документа об оценке соответствия (5.1)",
    length: 25,
  })
  statusDoc: string | null;

  @Column("date", {
    name: "date_status",
    nullable: true,
    comment: "Дата сверки статуса (5.2)",
  })
  dateStatus: string | null;

  @Column("int", {
    name: "id_dept_request",
    nullable: true,
    comment:
      "Информация о направлении запроса о представлении документов, послуживших основание для выдачи сертификата,  регистрации декларации(6.1)",
    unsigned: true,
  })
  idDeptRequest: number | null;

  @Column("date", {
    name: "data_request",
    nullable: true,
    comment: "Дата исх. (6.2)",
  })
  dataRequest: string | null;

  @Column("varchar", {
    name: "num_request",
    nullable: true,
    comment: "Исх.номер документа (6.3)",
    length: 25,
  })
  numRequest: string | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "submit",
    nullable: true,
    comment:
      "Сведения о предоставлении запрошенных документов 1-предоставлены,0-нет (7)",
  })
  submit: number | null;

  @Column("varchar", {
    name: "solution",
    nullable: true,
    comment:
      "Результаты рассмотрения документа об оценке соответствия, а также документов, послуживших основанием для его выдачи (регистрации (8))",
    length: 255,
  })
  solution: string | null;

  @Column("varchar", {
    name: "fio_staff",
    nullable: true,
    comment:
      "ФИО, должность, мето работы работника, рассмотревшего документы (9)",
    length: 255,
  })
  fioStaff: string | null;

  @Column("varchar", { name: "comm", nullable: true, length: 1250 })
  comm: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя, внесшего изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,2 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @ManyToOne(() => SSopb, (sSopb) => sSopb.sSopbCards, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_sopb", referencedColumnName: "idSopb" }])
  idSopb2: SSopb;

  @OneToMany(() => SSopbCardSubj, (sSopbCardSubj) => sSopbCardSubj.idCard2)
  sSopbCardSubjs: SSopbCardSubj[];

  @OneToMany(() => SSopbCardUid, (sSopbCardUid) => sSopbCardUid.idCard2)
  sSopbCardUs: SSopbCardUid[];
}
