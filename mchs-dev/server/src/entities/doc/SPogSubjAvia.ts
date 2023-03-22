import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_pog_subj_avia", { schema: "doc" })
export class SPogSubjAvia {
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
  idSubj: string | null;

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

  @Column("varchar", {
    name: "type_avia",
    nullable: true,
    comment: "Тип воздушного судна",
    length: 150,
  })
  typeAvia: string | null;

  @Column("varchar", {
    name: "num_reg_gai",
    nullable: true,
    comment: "Регистрационный знак",
    length: 55,
  })
  numRegGai: string | null;

  @Column("varchar", {
    name: "manufact_year",
    nullable: true,
    comment: "Год выпуска",
    length: 150,
  })
  manufactYear: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment:
      "Срок действия сертификата летной годности или назначенного ресурса",
    default: () => "'now()'",
  })
  dateEnd: string | null;

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
  dateRecord: string | null;

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
}
