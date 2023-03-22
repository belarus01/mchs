import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_cut", { schema: "doc" })
export class SFireCardCut {
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

  @Column("date", {
    name: "date_decision",
    nullable: true,
    comment: "Дата  вынесения",
  })
  dateDecision: string | null;

  @Column("varchar", {
    name: "ban_obj",
    nullable: true,
    comment: "Что приостановлено (запрещено)",
    length: 855,
  })
  banObj: string | null;

  @Column("varchar", {
    name: "num_case",
    nullable: true,
    comment: "№  дела",
    length: 4100,
  })
  numCase: string | null;

  @Column("date", {
    name: "date_ban",
    nullable: true,
    comment: "Дата приостановления (запрещения)",
    default: () => "'now()'",
  })
  dateBan: string | null;

  @Column("varchar", {
    name: "decision",
    nullable: true,
    comment: "Принятое решение (вид, дата)",
    length: 4100,
  })
  decision: string | null;

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
