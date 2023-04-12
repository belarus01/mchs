import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SEvents } from "./events.entity";
import { SEventsOrderQue } from "./eventsOrderQue.entity";
  
  @Index("FK_s_events_que_id_event", ["idEvent"], {})
  @Index("FK_s_events_que_id_que", ["idQue"], {})
  @Entity("s_events_que", { schema: "mchs" })
  export class SEventsQue {
    @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("bigint", { name: "id_event", nullable: true, unsigned: true })
    idEvent: number | null;
  
    @Column("bigint", { name: "id_que", nullable: true, unsigned: true })
    idQue: number | null;
  
    @Column("datetime", {
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
      comment: "Доп. информация",
      length: 850,
    })
    info: string | null;
  
    /* @OneToMany(
      () => SEventsOrderQue,
      (sEventsOrderQue) => sEventsOrderQue.idEventQue2
    )
    sEventsOrderQues: SEventsOrderQue[]; *////ВЗАИМОСВЯЗЬ В БД УБРАНА
  
    @ManyToOne(() => SEvents, (sEvents) => sEvents.sEventsQues, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "id_event", referencedColumnName: "idEvent" }])
    idEvent2: SEvents;
  }
  