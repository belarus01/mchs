import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./SEventsOrder";
import { SSubjObj } from "./SSubjObj";

@Index("FK_s_events_order_adm_ban_id_ban", ["idBan"], {})
@Index("FK_s_events_order_adm_ban_id_event_order", ["idEventOrder"], {})
@Index("FK_s_events_order_adm_ban_id_obj", ["idObj"], {})
@Index("FK_s_events_order_adm_ban_id_report", ["idReport"], {})
@Entity("s_events_order_adm_ban", { schema: "mchs" })
export class SEventsOrderAdmBan {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
  idList: number;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment: "Мероприятие",
    unsigned: true,
  })
  idEventOrder: string | null;

  @Column("bigint", {
    name: "id_obj",
    nullable: true,
    comment:
      "Что приостановлено(запрещено).Если NULL, то в бан отправляется весь id_subj",
    unsigned: true,
  })
  idObj: string | null;

  @Column("int", { name: "id_ban", nullable: true, unsigned: true })
  idBan: number | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-всем",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("datetime", {
    name: "date_begin",
    nullable: true,
    comment: "Дата приостановления(запрещения)",
  })
  dateBegin: Date | null;

  @Column("datetime", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: Date | null;

  @Column("date", {
    name: "date_decision",
    nullable: true,
    comment: "дата вынесения",
  })
  dateDecision: string | null;

  @Column("varchar", {
    name: "ban_obj",
    nullable: true,
    comment: "Что приостановлено(запрещено)",
    length: 1255,
  })
  banObj: string | null;

  @Column("varchar", {
    name: "num_case",
    nullable: true,
    comment: "Номер дела",
    length: 155,
  })
  numCase: string | null;

  @Column("varchar", {
    name: "decision",
    nullable: true,
    comment: "Принятое решение",
    length: 555,
  })
  decision: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-неактивно, 1-активно,2-удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @Column("tinyint", { name: "id_type_case", nullable: true, unsigned: true })
  idTypeCase: number | null;

  @Column("varchar", {
    name: "place",
    nullable: true,
    comment:
      "Место выявленных нарушений законодательства о пожарной безопасности",
    length: 255,
  })
  place: string | null;

  @Column("datetime", {
    name: "date_catch",
    nullable: true,
    comment:
      "Дата, время выявленных нарушений законодательства о пожарной безопасности",
  })
  dateCatch: Date | null;

  @Column("text", { name: "obst_sposob", nullable: true })
  obstSposob: string | null;

  @Column("bigint", { name: "id_report", nullable: true, unsigned: true })
  idReport: string | null;

  @ManyToOne(
    () => SEventsOrder,
    (sEventsOrder) => sEventsOrder.sEventsOrderAdmBans,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;

  @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sEventsOrderAdmBans, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_obj", referencedColumnName: "idObj" }])
  idObj2: SSubjObj;
}
