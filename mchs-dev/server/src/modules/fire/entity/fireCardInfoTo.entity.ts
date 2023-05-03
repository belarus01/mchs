import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_info_to", { schema: "mchs" })
export class SFireCardInfoTo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: number;

  @Column("bigint", { name: "id_card", nullable: true, unsigned: true })
  idCard: number | null;

  @Column("int", { name: "id_dept", nullable: true, unsigned: true })
  idDept: number | null;

  @Column("int", { name: "id_obl", nullable: true, unsigned: true })
  idObl: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: number | null;

  @Column("bigint", { name: "id_subj_obj", nullable: true, unsigned: true })
  idSubjObj: number | null;

  @Column("int", {
    name: "num_reg",
    nullable: true,
    comment: "№ по порядку ",
    unsigned: true,
  })
  numReg: number | null;

  @Column("varchar", {
    name: "date_num",
    nullable: true,
    comment: "Дата направления и исходящий №",
    length: 155,
  })
  dateNum: string | null;

  @Column("varchar", {
    name: "target",
    nullable: true,
    comment: "Наименование организации (кому направлена)",
    length: 855,
  })
  target: string | null;

  @Column("varchar", {
    name: "content",
    nullable: true,
    comment: "Краткое содержание",
    length: 4100,
  })
  content: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата составления (изменения)",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

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
