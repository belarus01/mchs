import { SSubjObj } from "src/modules/object/object.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
  
  @Index("FK_s_events_order_adm_ban_id_ban", ["idBan"], {})
  @Index("FK_s_events_order_adm_ban_id_event_order", ["idEventOrder"], {})
  @Index("FK_s_events_order_adm_ban_id_obj", ["idObj"], {})
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
    idEventOrder: number | null;
  
    @Column("bigint", {
      name: "id_obj",
      nullable: true,
      comment: "Что приостановлено(запрещено)",
      unsigned: true,
    })
    idObj: number | null;
  
    @Column("int", { name: "id_ban", nullable: true, unsigned: true })
    idBan: number | null;
  
    @Column("tinyint", {
      name: "org",
      comment: "0-Госнадзор, 1-пожарники,2-всем",
      unsigned: true,
      default: () => "'1'",
    })
    org: number;
  
    @Column("date", {
      name: "date_begin",
      nullable: true,
      comment: "Дата приостановления(запрещения)",
    })
    dateBegin: Date | null;
  
    @Column("date", {
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
    dateDecision: Date | null;
  
    @Column("varchar", {
      name: "num_case",
      nullable: true,
      comment: "Номер дела",
      length: 155,
    })
    numCase: string | null;
  
    @Column("varchar", { name: "decision", nullable: true, length: 555 })
    decision: string | null;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения записи",
      default: () => "'now()'",
    })
    dateRecord: Date | null;
  
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
  