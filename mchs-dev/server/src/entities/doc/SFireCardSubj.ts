import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_subj", { schema: "doc" })
export class SFireCardSubj {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
  idDept: number | null;

  @Column("int", { name: "id_obl", nullable: true, unsigned: true })
  idObl: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: string | null;

  @Column("int", { name: "num_reg", nullable: true, unsigned: true })
  numReg: number | null;

  @Column("varchar", {
    name: "descr",
    nullable: true,
    comment: "Краткое описание деятельности субъекта",
    length: 255,
  })
  descr: string | null;

  @Column("tinyint", {
    name: "type_org",
    nullable: true,
    comment: "0-пож,1-ПОГ,2-ПБ Чья епархия",
    unsigned: true,
  })
  typeOrg: number | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата составления (изменения)",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("varchar", {
    name: "addr_record",
    nullable: true,
    comment: "Населенный пункт ",
    length: 255,
  })
  addrRecord: string | null;

  @Column("decimal", {
    name: "area",
    nullable: true,
    comment: "Площадь застройки, м2",
    precision: 10,
    scale: 3,
  })
  area: string | null;

  @Column("varchar", {
    name: "service_org",
    nullable: true,
    comment:
      "6.2.2.3. Обслуживающая организация((наименование, юридический адрес,номер и дата выдачи лицензии,  руководитель,  телефон ) ",
    length: 2555,
  })
  serviceOrg: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-надзор, 1-пожарники,2-общий объект",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменения",
    unsigned: true,
  })
  uid: number | null;
}
