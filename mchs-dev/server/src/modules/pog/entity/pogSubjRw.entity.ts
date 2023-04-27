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

@Index("FK_s_pog_subj_rw_id_subj", ["idSubj"], {})
@Index("FK_s_pog_subj_rw_id_subj_obj", ["idSubjObj"], {})
@Entity("s_pog_subj_rw", { schema: "mchs" })
export class SPogSubjRw {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
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

  @Column("bigint", { name: "id_subj_obj", nullable: true, unsigned: true })
  idSubjObj: number | null;

  @Column("int", {
    name: "id_num_reg",
    nullable: true,
    comment: "ид.журнала о регистрации ПОГ doc.s_poo_docs",
    unsigned: true,
    default: () => "'1130'",
  })
  idNumReg: number | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ журнала регистра-ции ПОГ",
    unsigned: true,
    default: () => "'1130'",
  })
  numReg: number | null;

  @Column("varchar", {
    name: "num_order",
    nullable: true,
    comment: "Порядковый номер в журнале регистрации ПОГ",
    length: 85,
  })
  numOrder: string | null;

  @Column("varchar", {
    name: "unp",
    nullable: true,
    comment: "УНП субъекта",
    length: 30,
  })
  unp: string | null;

  @Column("varchar", {
    name: "name_addr_ovner_poo",
    nullable: true,
    comment: "Наименование организации субъекта, ФИО ИП владельца ПОГ",
    length: 250,
  })
  nameAddrOvnerPoo: string | null;

  @Column("int", {
    name: "id_obl_subj",
    nullable: true,
    comment: "Область субъекта владельца ПОГ mchs.s_ate_obl",
    unsigned: true,
  })
  idOblSubj: number | null;

  @Column("int", {
    name: "id_rayon_subj",
    nullable: true,
    comment: "Район субъекта владельца ПОГ mchs.s_ate_rayon",
    unsigned: true,
  })
  idRayonSubj: number | null;

  @Column("int", {
    name: "id_city_subj",
    nullable: true,
    comment: "Город субъекта владельца ПОГ mchs.s_ate_street.name_reestr",
    unsigned: true,
  })
  idCitySubj: number | null;

  @Column("int", {
    name: "id_street_subj",
    nullable: true,
    comment: "Улица субъекта владельца ПОГ mchs.s_ate_street.name_rus",
    unsigned: true,
  })
  idStreetSubj: number | null;

  @Column("varchar", {
    name: "num_build",
    nullable: true,
    comment: "Номер дома,корп.,индекс субъекта владельца ПОГ",
    length: 150,
  })
  numBuild: string | null;

  @Column("varchar", {
    name: "contacts",
    nullable: true,
    comment: "Контактные данные субъекта владельца ПОГ",
    length: 150,
  })
  contacts: string | null;

  @Column("int", {
    name: "num_tanc",
    nullable: true,
    comment:
      "Количество вагонов-цистерн, предназначенных для перевозки опасных грузов",
    unsigned: true,
  })
  numTanc: number | null;

  @Column("int", {
    name: "num_tanc_out",
    nullable: true,
    comment:
      "Количество вагонов-цистерн, предназначенных для перевозки опасных грузов, отработавших нормативный срок службы",
    unsigned: true,
  })
  numTancOut: number | null;

  @Column("int", {
    name: "num_loko",
    nullable: true,
    comment: "Количество локомотивов, занятых перевозкой опасных грузов",
    unsigned: true,
  })
  numLoko: number | null;

  @Column("int", {
    name: "num_loko_out",
    nullable: true,
    comment:
      "Количество локомотивов, занятых перевозкой опасных грузов, отработавших нормативный срок службы",
    unsigned: true,
  })
  numLokoOut: number | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-другие",
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

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sPogSubjRws, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
  idSubj2: SSubj;

  @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sPogSubjRws, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj_obj", referencedColumnName: "idObj" }])
  idSubjObj2: SSubjObj;
}
