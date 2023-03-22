import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_staff", { schema: "doc" })
export class SFireCardStaff {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", { name: "id_card", nullable: true, unsigned: true })
  idCard: string | null;

  @Column("int", { name: "id_dept", nullable: true })
  idDept: number | null;

  @Column("int", { name: "id_obl", nullable: true, unsigned: true })
  idObl: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: string | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ по порядку ",
    unsigned: true,
  })
  numReg: number | null;

  @Column("tinyint", {
    name: "type_org",
    nullable: true,
    comment: "0-должностные лица,1-внештатне пожарные формирования объекта",
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
    name: "staff_name",
    nullable: true,
    comment: "Должность",
    length: 255,
  })
  staffName: string | null;

  @Column("varchar", {
    name: "fio",
    nullable: true,
    comment: "Фамилия, имя, отчество",
    length: 255,
  })
  fio: string | null;

  @Column("varchar", {
    name: "phone",
    nullable: true,
    comment: "№ телефона ",
    length: 255,
  })
  phone: string | null;

  @Column("varchar", {
    name: "info",
    nullable: true,
    comment: "доп.инфо",
    length: 255,
  })
  info: string | null;

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
