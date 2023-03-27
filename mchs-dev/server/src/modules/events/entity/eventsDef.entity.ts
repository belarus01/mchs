import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SEventsOrderDef } from "./eventsOrderDef.entity";


@Entity("s_events_def", { schema: "mchs" })
export class SEventsDef {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: number;

  @Column("bigint", { name: "id_event", nullable: true, unsigned: true })
  idEvent: number | null;

  @Column("bigint", { name: "id_def", nullable: true, unsigned: true })
  idDef: number | null;

  @Column("varchar", {
    name: "num",
    nullable: true,
    comment: "Номер нарушения",
    length: 55,
  })
  num: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-надзор, 1-пожарники",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

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

  @Column("varchar", {
    name: "info",
    nullable: true,
    comment: "Доп.информация",
    length: 850,
  })
  info: string | null;

  @OneToMany(
    () => SEventsOrderDef,
    (sEventsOrderDef) => sEventsOrderDef.idEventDef2
  )
  sEventsOrderDefs: SEventsOrderDef[];
}
