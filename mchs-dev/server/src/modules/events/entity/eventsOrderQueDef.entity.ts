import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
import { SEventsOrderQue } from "./eventsOrderQue.entity";
import { SSubjObj } from "src/modules/object/entity/object.entity";
  
  @Index("FK_s_events_order_que_def_id_def2", ["idDef"], {})
  @Index("FK_s_events_order_que_def_id_event_order", ["idEventOrder"], {})
  @Index("FK_s_events_order_que_def_id_event_order_que", ["idEventQue"], {})
  @Index("FK_s_events_order_que_def_id_obj", ["idObj"], {})
  @Entity("s_events_order_que_def", { schema: "mchs" })
  export class SEventsOrderQueDef {
    @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
    idList: number;
  
    @Column("bigint", { name: "id_event_order", nullable: true, unsigned: true })
    idEventOrder: number | null;
  
    @Column("int", { name: "id_event_que", nullable: true, unsigned: true })
    idEventQue: number | null;
  
    @Column("bigint", { name: "id_obj", nullable: true, unsigned: true })
    idObj: number | null;
  
    @Column("bigint", { name: "id_def", nullable: true, unsigned: true })
    idDef: number | null;
  
    @Column("int", {
      name: "num_reg",
      nullable: true,
      comment: "Номер по порядку",
      unsigned: true,
    })
    numReg: number | null;
  
    @Column("tinyint", {
      name: "fl_ok",
      comment: "0-исправлено, 1-нет,2 частично,3-перенесено",
      unsigned: true,
      default: () => "'1'",
    })
    flOk: number;
  
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
  
    @Column("date", {
      name: "date_fix",
      nullable: true,
      comment: "Дата устранения замечаний(срок устранения).",
    })
    dateFix: Date | null;
  
    @Column("date", {
      name: "date_inform",
      nullable: true,
      comment: "Дата информирования об устранении нарушения",
    })
    dateInform: Date | null;
  
    @Column("date", {
      name: "date_check_fix",
      nullable: true,
      comment: "Дата проведения мероприятия по контролю за устранением нарушения",
    })
    dateCheckFix: Date | null;
  
    @Column("varchar", {
      name: "transfer_data",
      nullable: true,
      comment:
        "сведения о переносе сроков устранения нарушения: наим.докум.,вход.№, дата",
      length: 855,
    })
    transferData: string | null;
  
    @ManyToOne(
      () => SEventsOrder,
      (sEventsOrder) => sEventsOrder.sEventsOrderQueDefs,
      { onDelete: "NO ACTION", onUpdate: "CASCADE" }
    )
    @JoinColumn([
      { name: "id_event_order", referencedColumnName: "idEventOrder" },
    ])
    idEventOrder2: SEventsOrder;
  
    @ManyToOne(
      () => SEventsOrderQue,
      (sEventsOrderQue) => sEventsOrderQue.sEventsOrderQueDefs,
      { onDelete: "NO ACTION", onUpdate: "CASCADE" }
    )
    @JoinColumn([{ name: "id_event_que", referencedColumnName: "idList" }])
    idEventQue2: SEventsOrderQue;
  
    @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sEventsOrderQueDefs, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_obj", referencedColumnName: "idObj" }])
    idObj2: SSubjObj;
  }
  