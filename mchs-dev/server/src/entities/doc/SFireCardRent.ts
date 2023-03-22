import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_rent", { schema: "doc" })
export class SFireCardRent {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", { name: "id_card", nullable: true, unsigned: true })
  idCard: string | null;

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
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

  @Column("datetime", {
    name: "name_addr",
    nullable: true,
    comment: "Наименование организации и ее юридический адрес  ",
  })
  nameAddr: Date | null;

  @Column("varchar", {
    name: "contract_info",
    nullable: true,
    comment: "№ и дата заключения договора-аренды",
    length: 855,
  })
  contractInfo: string | null;

  @Column("varchar", {
    name: "rent_info",
    nullable: true,
    comment: "Арендуемые площади и помещения, место их расположения на объекте",
    length: 4100,
  })
  rentInfo: string | null;

  @Column("varchar", {
    name: "name_oked",
    nullable: true,
    comment: "Вид деятельности арендной организации",
    length: 250,
  })
  nameOked: string | null;

  @Column("int", {
    name: "id_oked",
    nullable: true,
    comment: "Ид.вида деятельности арендной организации",
    unsigned: true,
  })
  idOked: number | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата составления (изменения)",
    default: () => "'now()'",
  })
  dateRecord: string | null;

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
