import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
  
  @Index("type_event", ["numEvent"], {})
  @Entity("s_events", { schema: "mchs" })
  export class SEvents {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id_event", unsigned: true })
    idEvent: number;
  
    @Column("varchar", {
      name: "event",
      nullable: true,
      comment: "Мероприятие",
      length: 520,
    })
    event: string | null;
  
    @Column("int", {
      name: "num_event",
      nullable: true,
      comment: "Номер мероприятия",
      unsigned: true,
    })
    numEvent: number | null;
  
    @Column("tinyint", {
      name: "org",
      nullable: true,
      comment: "0-госпромнадзор,1-пожарники",
      unsigned: true,
      default: () => "'0'",
    })
    org: number | null;
  
    @Column("datetime", { name: "date_begin", nullable: true, comment: "Начало" })
    dateBegin: Date | null;
  
    @Column("datetime", {
      name: "date_end",
      nullable: true,
      comment: "Дата внесения изменений",
    })
    dateEnd: Date | null;
  
    @Column("date", {
      name: "date_record",
      nullable: true,
      comment: "Дата изменения записи",
    })
    dateRecord: Date | null;
  
    @Column("tinyint", {
      name: "active",
      comment: "0-удалено, 1-актино",
      unsigned: true,
      default: () => "'1'",
    })
    active: number;
  
    @Column("varchar", {
      name: "status",
      nullable: true,
      comment: "Статус",
      length: 50,
      default: () => "'wait'",
    })
    status: string | null; //wait/in_progress/ended
  
    @Column("text", { name: "data", nullable: true })
    data: string | null;
  
    @Column("int", {
      name: "uid",
      nullable: true,
      comment: "Пользователь, создавший/изменивший запись",
      unsigned: true,
    })
    uid: number | null;
  
    @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idEvent2)
    sEventsOrders: SEventsOrder[];
  }
  