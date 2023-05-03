import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_internal", { schema: "mchs" })
export class SFireCardInternal {
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

  @Column("int", {
    name: "num_pk",
    nullable: true,
    comment: "Всего ПК",
    unsigned: true,
  })
  numPk: number | null;

  @Column("varchar", {
    name: "num_pk_floor",
    nullable: true,
    comment: "Количество ПК на этаже",
    length: 55,
  })
  numPkFloor: string | null;

  @Column("decimal", {
    name: "diam_water_network",
    nullable: true,
    comment: "Диаметр водопроводной сети ????",
    precision: 10,
    scale: 3,
  })
  diamWaterNetwork: number | null;

  @Column("varchar", {
    name: "type_screw",
    nullable: true,
    comment:
      "Тип полугайки.: Б – полугайки типа Богданова, Р – полугайки типа «Рот».",
    length: 5,
  })
  typeScrew: string | null;

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
