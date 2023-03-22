import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_info", { schema: "doc" })
export class SFireCardInfo {
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

  @Column("varchar", {
    name: "date_fire",
    nullable: true,
    comment: "Дата пожара",
    length: 155,
  })
  dateFire: string | null;

  @Column("varchar", {
    name: "addr",
    nullable: true,
    comment: "Место пожара",
    length: 855,
  })
  addr: string | null;

  @Column("varchar", {
    name: "trouble",
    nullable: true,
    comment: "Последствия",
    length: 4100,
  })
  trouble: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата составления (изменения)",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("varchar", {
    name: "ground",
    nullable: true,
    comment: "Причина, виновные",
    length: 1255,
  })
  ground: string | null;

  @Column("varchar", {
    name: "step",
    nullable: true,
    comment: "Принятые меры",
    length: 1255,
  })
  step: string | null;

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
