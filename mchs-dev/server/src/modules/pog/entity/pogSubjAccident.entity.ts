import { SSubjObj } from "src/modules/object/entity/object.entity";
import { SSubj } from "src/modules/subject/entity/subject.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("FK_s_pog_subj_accidents_id_obj", ["idObj"], {})
@Index("FK_s_pog_subj_accidents_id_subj", ["idSubj"], {})
@Entity("s_pog_subj_accidents", { schema: "mchs" })
export class SPogSubjAccidents {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: number;

  @Column("int", {
    name: "id_dept",
    nullable: true,
    comment: "Департамент, владелец записи",
    unsigned: true,
  })
  idDept: number | null;

  @Column("int", {
    name: "id_dept_dom",
    nullable: true,
    comment: "Индекс структурного подразделения, зарегистрировавшего ПОГ",
    unsigned: true,
  })
  idDeptDom: number | null;

  @Column("int", {
    name: "id_obl",
    nullable: true,
    comment: "Область департамента",
    unsigned: true,
    default: () => "'1'",
  })
  idObl: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: number | null;

  @Column("bigint", { name: "id_obj", nullable: true, unsigned: true })
  idObj: number | null;

  @Column("tinyint", {
    name: "fl_accid",
    comment: "0-инцидент, 1-авария,2-пожар",
    unsigned: true,
    default: () => "'0'",
  })
  flAccid: number;

  @Column("tinyint", {
    name: "type_org",
    nullable: true,
    comment: "1-ПОГ,2-ПБ Чья епархия",
    unsigned: true,
  })
  typeOrg: number | null;

  @Column("int", {
    name: "id_num_reg",
    nullable: true,
    comment: "ид.журнала о регистрации ПОГ doc.s_poo_docs",
    unsigned: true,
    default: () => "'2100'",
  })
  idNumReg: number | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ журнала регистра-ции ПОГ",
    unsigned: true,
    default: () => "'2100'",
  })
  numReg: number | null;

  @Column("varchar", {
    name: "num_order",
    nullable: true,
    comment: "Порядковый номер в журнале регистрации ПОГ",
    length: 85,
  })
  numOrder: string | null;

  @Column("date", { name: "date_accid", nullable: true, comment: "Дата" })
  dateAccid: Date | null;

  @Column("time", { name: "time_accid", nullable: true, comment: "Время" })
  timeAccid: Date | null;

  @Column("varchar", {
    name: "place_accid",
    nullable: true,
    comment: "Место",
    length: 255,
  })
  placeAccid: string | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "УНП  владельца объекта перевозки опасных грузов",
    length: 30,
  })
  unp: string | null;

  @Column("varchar", {
    name: "info",
    nullable: true,
    comment: "Краткое содержание",
    length: 3500,
  })
  info: string | null;

  @Column("varchar", {
    name: "victim",
    nullable: true,
    comment: "Наличие пострадавших (заполняется, если авария)",
    length: 500,
  })
  victim: string | null;

  @Column("bigint", {
    name: "harm_many",
    nullable: true,
    comment: "Размер причиненного вреда (бел. руб.) (заполняется, если авария)",
    unsigned: true,
  })
  harmMany: number | null;

  @Column("date", {
    name: "date_control",
    nullable: true,
    comment:
      "Дата направления акта технического расследования причин аварии/инцидента",
  })
  dateControl: Date | null;

  @Column("varchar", {
    name: "event",
    nullable: true,
    comment:
      "Мероприятия, которые должны быть проведены по результатам техн.расслед. причин аварии, инцидента",
    length: 1500,
  })
  event: string | null;

  @Column("varchar", {
    name: "event_exec",
    nullable: true,
    comment: "Отметка о выполнении мероприятий",
    length: 80,
  })
  eventExec: string | null;

  @Column("varchar", {
    name: "note",
    nullable: true,
    comment: "Примечания",
    length: 500,
  })
  note: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-не используется, 1-пожарники,2-промбез,3-ПОГ,",
    unsigned: true,
    default: () => "'0'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-активно",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sPogSubjAccidents, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_obj", referencedColumnName: "idObj" }])
  idObj2: SSubjObj;

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sPogSubjAccidents, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
  idSubj2: SSubj;
}
