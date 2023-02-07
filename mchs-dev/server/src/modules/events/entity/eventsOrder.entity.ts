import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEvents } from "./events.entity";
import { SEventsOrderData } from "./eventsOrderData.entity";
import { Group } from "src/modules/group/group.entity";
import { SEventsPrivate } from "./eventsPrivate.entity";
import { SUnits } from "src/modules/unit/unit.entity";

@Index("FK_s_events_order_id_group2", ["idGroup"], {})
@Index("FK_s_events_order_id_subj", ["idSubj"], {})
//@Index("FK_s_events_order_id_unit", ["idUnit"], {schema: "doc"})
@Index("FK_s_events_order_id_unit", ["idUnit"], {})
@Index("s_events_order_FK", ["idEvent"], {})
@Index("type_order", ["typeCheck"], {})
@Entity("s_events_order", { schema: "mchs" })
export class SEventsOrder {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id_event_order",
    unsigned: true,
  })
  idEventOrder: number;

  @Column("bigint", {
    name: "id_event",
    nullable: true,
    comment: "Мероприятие",
    unsigned: true,
  })
  idEvent: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: number | null;

  @Column("int", { name: "id_group", nullable: true, unsigned: true })
  idGroup: number | null;

  @Column("varchar", {
    name: "type_order",
    nullable: true,
    comment:
      "Вид надзорно-профилактического мероприятия (1-проверка,2- мониторинг,3- обследование).\r\nБерем из  doc.s_units.type_unit=4 поле name",
    length: 55,
  })
  typeOrder: string | null;

  @Column("varchar", {
    name: "type_check",
    nullable: true,
    comment:
      "Тип проверки 1-выборочная,2-внеплановая,3-мониторинг.3-для использ.при планир.проверок.Берем из  doc.s_units.type_unit=3 поле name",
    length: 55,
  })
  typeCheck: string | null;

  @Column("varchar", {
    name: "sphera",
    nullable: true,
    comment:
      "Сфера контроля(надзора). Берем из doc.s_units.type_unit.id_unit=0, поле name.ВНИМАНИЕ! для Ч.Л.5-11 смотреть с id_parent",
    length: 255,
  })
  sphera: string | null;

  @Column("bigint", {
    name: "id_unit",
    nullable: true,
    comment: "doc.s_units.type_unit=0 (sphera=name)",
    unsigned: true,
  })
  idUnit: number | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-госпромнадзор,1-пожарники",
    unsigned: true,
    default: () => "'0'",
  })
  org: number | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment:
      "Дата начала надзорно-профилактического мероприятия (по предписанию/решению)",
  })
  dateBegin: Date | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment:
      "Дата окончания надзорно-профилактического мероприятия (по предписанию/решению)",
  })
  dateEnd: Date | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино,2-продлено,3-завершено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("varchar", {
    name: "status",
    nullable: true,
    comment:
      "Статус задачи:1-не спланирована,2-в работе,3- завершена, 4-просрочена",
    length: 50,
    default: () => "'wait'",
  })
  status: string | null;

  @Column("text", { name: "comm", nullable: true, comment: "Комментарий" })
  comm: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment:
      "Пользователь, должностное лицо, направившее контрольный список вопросов (чек-лист)",
    unsigned: true,
  })
  uid: number | null;

  @Column("varchar", {
    name: "reason_order",
    nullable: true,
    comment: "Основание назначения надзорно-профилактического мероприятия",
    length: 255,
  })
  reasonOrder: string | null;

  @Column("varchar", {
    name: "post_title",
    nullable: true,
    comment: "Должность лица, выдавшего предписание на проведение проверки",
    length: 255,
  })
  postTitle: string | null;

  @Column("varchar", {
    name: "fio_post_title",
    nullable: true,
    comment:
      "Ф.И.О лица, выдавшего предписание на проведение проверки (решение на проведение мониторинга)",
    length: 255,
  })
  fioPostTitle: string | null;

  @Column("varchar", {
    name: "num_order",
    nullable: true,
    comment: "Номер предписания",
    length: 50,
  })
  numOrder: string | null;

  @Column("date", {
    name: "date_order",
    nullable: true,
    comment:
      "Дата выдачи предписания на проведение проверки (решения на проведение мониторинга)",
  })
  dateOrder: Date | null;

  @Column("date", {
    name: "period_check_from",
    nullable: true,
    comment: "Начало проверяемого периода",
  })
  periodCheckFrom: Date | null;

  @Column("date", {
    name: "period_check_to",
    nullable: true,
    comment: "Окончание проверяемого периода",
  })
  periodCheckTo: Date | null;

  @Column("date", {
    name: "date_begin_fact",
    nullable: true,
    comment:
      "Фактическая дата начала надзорно-профилактического мероприятия . Начало заполнения чек-листа?",
  })
  dateBeginFact: Date | null;

  @Column("date", {
    name: "date_end_fact",
    nullable: true,
    comment:
      "Фактическая дата окончания надзорно-профилактического мероприятия ",
  })
  dateEndFact: Date | null;

  @Column("date", {
    name: "date_stop",
    nullable: true,
    comment:
      "Дата приостановления проведения надзорно-профилактического мероприятия",
  })
  dateStop: Date | null;

  @Column("date", {
    name: "date_continue",
    nullable: true,
    comment:
      "Дата возобновления проведения надзорно-профилактического мероприятия",
  })
  dateContinue: Date | null;

  @Column("date", {
    name: "date_to",
    nullable: true,
    comment: "Дата, до которой продлен срок проведения проверки",
  })
  dateTo: Date | null;

  @Column("varchar", {
    name: "post_agent",
    nullable: true,
    comment: "Должность представителя субъекта",
    length: 255,
  })
  postAgent: string | null;

  @Column("varchar", {
    name: "name_agent",
    nullable: true,
    comment: "Ф.И.О представителя субъекта",
    length: 255,
  })
  nameAgent: string | null;

  @ManyToOne(() => Group, (group) => group.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_group", referencedColumnName: "idGroup" }])
  idGroup2: Group;

  @ManyToOne(() => SEvents, (sEvents) => sEvents.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_event", referencedColumnName: "idEvent" }])
  idEvent2: SEvents;

  @OneToMany(
    () => SEventsOrderData,
    (sEventsOrderData) => sEventsOrderData.idEventOrder2
  )
  sEventsOrderData: SEventsOrderData[];

  @OneToMany(
    () => SEventsPrivate,
    (sEventsPrivate) => sEventsPrivate.idEventOrder2
  )
  sEventsPrivates: SEventsPrivate[];

  //////////////added
 /*  @ManyToMany(
    () => SUnits,
    (unit) => unit.sEventsOrder)
  units: SUnits;*/
} 

  