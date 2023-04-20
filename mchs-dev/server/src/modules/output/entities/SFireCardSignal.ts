import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_fire_card_signal", { schema: "doc" })
export class SFireCardSignal {
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
    name: "receive_station",
    nullable: true,
    comment: "Приемная станция",
    length: 55,
  })
  receiveStation: string | null;

  @Column("varchar", {
    name: "addr",
    nullable: true,
    comment: "Место установки",
    length: 55,
  })
  addr: string | null;

  @Column("varchar", {
    name: "detector_mark",
    nullable: true,
    comment: "Марка извещателей",
    length: 55,
  })
  detectorMark: string | null;

  @Column("varchar", {
    name: "num_cable",
    nullable: true,
    comment: "Количество шлейфов",
    length: 55,
  })
  numCable: string | null;

  @Column("varchar", {
    name: "where_sygnal",
    nullable: true,
    comment: "Куда выведен сигнал о срабатывании",
    length: 55,
  })
  whereSygnal: string | null;

  @Column("varchar", {
    name: "with_block",
    nullable: true,
    comment: "С чем сблокирована",
    length: 55,
  })
  withBlock: string | null;

  @Column("varchar", {
    name: "date_in",
    nullable: true,
    comment: "Дата приемки в эксплуатацию",
    length: 55,
  })
  dateIn: string | null;

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
