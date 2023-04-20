import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEvents } from "./SEvents";

@Index("FK_s_events_def_id_event", ["idEvent"], {})
@Index("FK_s_events_def_id_def", ["idDef"], {})
@Entity("s_events_def", { schema: "mchs" })
export class SEventsDef {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", { name: "id_event", nullable: true, unsigned: true })
  idEvent: string | null;

  @Column("bigint", { name: "id_def", nullable: true, unsigned: true })
  idDef: string | null;

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
  dateRecord: string | null;

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

  @ManyToOne(() => SEvents, (sEvents) => sEvents.sEventsDefs, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_event", referencedColumnName: "idEvent" }])
  idEvent2: SEvents;
}
