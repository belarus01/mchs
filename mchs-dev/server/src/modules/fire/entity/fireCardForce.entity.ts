import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_force", { schema: "mchs" })
export class SFireCardForce {
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

  @Column("date", { name: "date_force", nullable: true, comment: "Дата" })
  dateForce: Date | null;

  @Column("varchar", {
    name: "staff",
    nullable: true,
    comment: "Должность нарушителя",
    length: 855,
  })
  staff: string | null;

  @Column("varchar", {
    name: "fio",
    nullable: true,
    comment: "Фамилия, имя, отчество",
    length: 4100,
  })
  fio: string | null;

  @Column("varchar", {
    name: "num_case",
    nullable: true,
    comment: "№ административного дела,вид ответственности",
    length: 4100,
  })
  numCase: string | null;

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
