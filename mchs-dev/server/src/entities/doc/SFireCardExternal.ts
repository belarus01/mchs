import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_external", { schema: "doc" })
export class SFireCardExternal {
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

  @Column("int", {
    name: "type_space",
    nullable: true,
    comment: "Вид водоисточника, объем  (м3)",
    unsigned: true,
  })
  typeSpace: number | null;

  @Column("varchar", {
    name: "addr",
    nullable: true,
    comment: "Место расположения водоисточника",
    length: 155,
  })
  addr: string | null;

  @Column("varchar", {
    name: "type_network",
    nullable: true,
    comment: "Вид сети",
    length: 55,
  })
  typeNetwork: string | null;

  @Column("decimal", {
    name: "diam_water_network",
    nullable: true,
    comment: "Диаметр водопроводной сети ????",
    precision: 10,
    scale: 3,
  })
  diamWaterNetwork: string | null;

  @Column("tinyint", {
    name: "water_take",
    nullable: true,
    comment:
      "Способ забора воды 0 - забор воды при помощи пожарных автомобилей невозможен; 1- непосредственно из водоема; 2- из колодца через отводную трубу без задвижки; 3- из колодца через отводную трубу с задвижкой; 4- через приемную трубу с задвижкой",
    unsigned: true,
  })
  waterTake: number | null;

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
