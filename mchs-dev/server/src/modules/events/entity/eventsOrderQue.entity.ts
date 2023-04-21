import { SQuestion } from "src/modules/question/entity/question.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SEventsOrderQueDef } from "./eventsOrderQueDef.entity";

@Index("FK_s_events_order_que_id_event_order", ["idEventOrder"], {})
@Index("FK_s_events_order_que_id_event_que", ["idQue"], {})
@Entity("s_events_order_que", { schema: "mchs" })
export class SEventsOrderQue {
  @Column("int", { primary: true, name: "id_list", unsigned: true })
  idList: number;

  @Column("bigint", { name: "id_event_order", nullable: true, unsigned: true })
  idEventOrder: number | null;

  @Column("bigint", { name: "id_que", nullable: true, unsigned: true })
  idQue: number | null;

  @Column("tinyint", {
    name: "fl_ok",
    nullable: true,
    comment: "0-исправлено, 1-нет,2 частично,3-перенесено",
    unsigned: true,
  })
  flOk: number | null;

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

  @Column("varchar", {
    name: "problem_info",
    nullable: true,
    comment:
      "В карточке учета субъекта пром.безопасности.Сведения о проблемных вопросах",
    length: 850,
  })
  problemInfo: string | null;

  @ManyToOne(() => SQuestion, (sQuestion) => sQuestion.sEventsOrderQues, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_que", referencedColumnName: "idQue" }])
  idQue2: SQuestion;

  @OneToMany(
    () => SEventsOrderQueDef,
    (sEventsOrderQueDef) => sEventsOrderQueDef.idEventQue2
  )
  sEventsOrderQueDefs: SEventsOrderQueDef[];
}

  
  /*     @ManyToOne(
      () => SEventsOrder,
      (sEventsOrder) => sEventsOrder.sEventsOrderQues,
      { onDelete: "NO ACTION", onUpdate: "CASCADE" }
    )
    @JoinColumn([
      { name: "id_event_order", referencedColumnName: "idEventOrder" },
    ])
    idEventOrder2: SEventsOrder; *///ВЗАИМОСВЯЗЬ В БД УБРАНА
  
/*     @ManyToOne(() => SEventsQue, (sEventsQue) => sEventsQue.sEventsOrderQues, {
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "id_event_que", referencedColumnName: "idList" }])
    idEventQue2: SEventsQue; *////ВЗАИМОСВЯЗЬ В БД УБРАНА