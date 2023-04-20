import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("upu_server_param", { schema: "mchs" })
export class UpuServerParam {
  @PrimaryGeneratedColumn({ type: "int", name: "id_param", unsigned: true })
  idParam: number;

  @Column("int", {
    name: "num_param",
    comment: "Номер параметра по порядку (порядок отображения)",
    unsigned: true,
    default: () => "'1'",
  })
  numParam: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Параметр",
    length: 255,
  })
  name: string | null;

  @Column("varchar", {
    name: "unit",
    nullable: true,
    comment: "единица измерения",
    length: 255,
  })
  unit: string | null;

  @Column("int", {
    name: "param1",
    nullable: true,
    comment: "минимальное нормальное  значение",
    unsigned: true,
    default: () => "'0'",
  })
  param1: number | null;

  @Column("int", {
    name: "param2",
    nullable: true,
    comment: "предельное нормальное значение",
    unsigned: true,
    default: () => "'0'",
  })
  param2: number | null;

  @Column("timestamp", { name: "date_record", nullable: true })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-параметр отключен,1-отслеживать",
    unsigned: true,
  })
  active: number | null;
}
