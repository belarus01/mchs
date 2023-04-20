import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SDept } from "./SDept";
import { SEvents } from "./SEvents";
import { SEventsPlan } from "./SEventsPlan";
import { Group } from "./Group";
import { SSubj } from "./SSubj";
import { SEventsOrderAdmBan } from "./SEventsOrderAdmBan";
import { SEventsOrderAdmForce } from "./SEventsOrderAdmForce";
import { SEventsOrderData } from "./SEventsOrderData";
import { SEventsOrderDef } from "./SEventsOrderDef";
import { SEventsOrderDefMtx } from "./SEventsOrderDefMtx";
import { SEventsOrderObj } from "./SEventsOrderObj";
import { SEventsOrderQueDef } from "./SEventsOrderQueDef";
import { SEventsPrivate } from "./SEventsPrivate";

@Index("s_events_order_FK", ["idEvent"], {})
@Index("FK_s_events_order_id_unit", ["idUnit"], {})
@Index("FK_s_events_order_id_subj2", ["idSubj"], {})
@Index("FK_s_events_order_sphera", ["sphera"], {})
@Index("FK_s_events_order_id_unit_3", ["idUnit_3"], {})
@Index("FK_s_events_order_id_unit_4", ["idUnit_4"], {})
@Index("FK_s_events_order_id_dept", ["idDept"], {})
@Index("FK_s_events_order_id_group", ["idGroup"], {})
@Index("FK_s_events_order_id_event_plan", ["idEventPlan"], {})
@Index("FK_s_events_order_id_dept_iss", ["idDeptIss"], {})
@Entity("s_events_order", { schema: "mchs" })
export class SEventsOrder {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id_event_order",
    comment: "Сведения о принятии решения о назначении внеплановой проверки",
    unsigned: true,
  })
  idEventOrder: string;

  @Column("bigint", {
    name: "id_event",
    nullable: true,
    comment: "Мероприятие",
    unsigned: true,
  })
  idEvent: string | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: string | null;

  @Column("int", {
    name: "id_dept_iss",
    nullable: true,
    comment: "Контр.орган,выдавший предписание",
    unsigned: true,
  })
  idDeptIss: number | null;

  @Column("int", {
    name: "id_dept",
    nullable: true,
    comment: "Контр.орган, которому поручено проведение проверки",
    unsigned: true,
  })
  idDept: number | null;

  @Column("int", { name: "id_group", nullable: true, unsigned: true })
  idGroup: number | null;

  @Column("varchar", {
    name: "num_order",
    nullable: true,
    comment: "Пункт плана проверок",
    length: 50,
  })
  numOrder: string | null;

  @Column("varchar", {
    name: "name_order",
    nullable: true,
    comment: "Основание назначения проверки",
    length: 255,
  })
  nameOrder: string | null;

  @Column("varchar", {
    name: "reason_order",
    nullable: true,
    comment: "Основание назначения надзорно-профилактического мероприятия",
    length: 255,
  })
  reasonOrder: string | null;

  @Column("bigint", {
    name: "id_unit_3",
    nullable: true,
    comment:
      "Вид надзорно-профилактического мероприятия (1-проверка,2- мониторинг,3- обследование).\r\nБерем из  doc.s_units.type_unit=4 поле name",
    unsigned: true,
  })
  idUnit_3: string | null;

  @Column("bigint", {
    name: "id_unit_4",
    nullable: true,
    comment:
      "Тип проверки 1-выборочная,2-внеплановая,3-для использ.при планир.проверок.Берем из  doc.s_units.type_unit=3 поле name",
    unsigned: true,
  })
  idUnit_4: string | null;

  @Column("int", { name: "id_event_plan", nullable: true, unsigned: true })
  idEventPlan: number | null;

  @Column("bigint", {
    name: "sphera",
    nullable: true,
    comment:
      "Сфера контроля(надзора). Берем из doc.s_units.type_unit.id_unit=0, поле name.ВНИМАНИЕ! для Ч.Л.5-11 смотреть с id_parent",
    unsigned: true,
  })
  sphera: string | null;

  @Column("varchar", {
    name: "technical",
    nullable: true,
    comment: "Применяемые научно-технические средства",
    length: 855,
  })
  technical: string | null;

  @Column("bigint", {
    name: "id_unit",
    nullable: true,
    comment: "doc.s_units.type_unit=0 (sphera=name)",
    unsigned: true,
  })
  idUnit: string | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-госпромнадзор,1-пожарники",
    unsigned: true,
    default: () => "'0'",
  })
  org: number | null;

  @Column("datetime", {
    name: "date_begin",
    nullable: true,
    comment:
      "Дата начала надзорно-профилактического мероприятия (по предписанию/решению)",
  })
  dateBegin: Date | null;

  @Column("datetime", {
    name: "date_end",
    nullable: true,
    comment:
      "Дата окончания надзорно-профилактического мероприятия (по предписанию/решению)",
  })
  dateEnd: Date | null;

  @Column("datetime", {
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
    default: () => "'1'",
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

  @Column("datetime", {
    name: "date_order",
    nullable: true,
    comment:
      "Дата выдачи предписания на проведение проверки (решения на проведение мониторинга)",
  })
  dateOrder: Date | null;

  @Column("datetime", {
    name: "period_check_from",
    nullable: true,
    comment: "Начало проверяемого периода",
  })
  periodCheckFrom: Date | null;

  @Column("datetime", {
    name: "period_check_to",
    nullable: true,
    comment: "Окончание проверяемого периода",
  })
  periodCheckTo: Date | null;

  @Column("datetime", {
    name: "date_begin_fact",
    nullable: true,
    comment:
      "Фактическая дата начала надзорно-профилактического мероприятия . Начало заполнения чек-листа?",
  })
  dateBeginFact: Date | null;

  @Column("datetime", {
    name: "date_end_fact",
    nullable: true,
    comment:
      "Фактическая дата окончания надзорно-профилактического мероприятия ",
  })
  dateEndFact: Date | null;

  @Column("datetime", {
    name: "date_stop",
    nullable: true,
    comment:
      "Дата приостановления проведения надзорно-профилактического мероприятия",
  })
  dateStop: Date | null;

  @Column("datetime", {
    name: "date_continue",
    nullable: true,
    comment:
      "Дата возобновления проведения надзорно-профилактического мероприятия",
  })
  dateContinue: Date | null;

  @Column("datetime", {
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

  @Column("varchar", {
    name: "other_info",
    nullable: true,
    comment: "Сведения о проблемных вопросах (карта учеа субъекта)",
    length: 1255,
  })
  otherInfo: string | null;

  @ManyToOne(() => SDept, (sDept) => sDept.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_dept", referencedColumnName: "idDept" }])
  idDept2: SDept;

  @ManyToOne(() => SDept, (sDept) => sDept.sEventsOrders2, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_dept_iss", referencedColumnName: "idDept" }])
  idDeptIss2: SDept;

  @ManyToOne(() => SEvents, (sEvents) => sEvents.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_event", referencedColumnName: "idEvent" }])
  idEvent2: SEvents;

  @ManyToOne(() => SEventsPlan, (sEventsPlan) => sEventsPlan.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_event_plan", referencedColumnName: "idEventPlan" }])
  idEventPlan2: SEventsPlan;

  @ManyToOne(() => Group, (group) => group.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_group", referencedColumnName: "idGroup" }])
  idGroup2: Group;

  @ManyToOne(() => SSubj, (sSubj) => sSubj.sEventsOrders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_subj", referencedColumnName: "idSubj" }])
  idSubj2: SSubj;

  @OneToMany(
    () => SEventsOrderAdmBan,
    (sEventsOrderAdmBan) => sEventsOrderAdmBan.idEventOrder2
  )
  sEventsOrderAdmBans: SEventsOrderAdmBan[];

  @OneToMany(
    () => SEventsOrderAdmForce,
    (sEventsOrderAdmForce) => sEventsOrderAdmForce.idEventOrder2
  )
  sEventsOrderAdmForces: SEventsOrderAdmForce[];

  @OneToMany(
    () => SEventsOrderData,
    (sEventsOrderData) => sEventsOrderData.idEventOrder2
  )
  sEventsOrderData: SEventsOrderData[];

  @OneToMany(
    () => SEventsOrderDef,
    (sEventsOrderDef) => sEventsOrderDef.idEventOrder2
  )
  sEventsOrderDefs: SEventsOrderDef[];

  @OneToMany(
    () => SEventsOrderDefMtx,
    (sEventsOrderDefMtx) => sEventsOrderDefMtx.idEventOrder2
  )
  sEventsOrderDefMtxes: SEventsOrderDefMtx[];

  @OneToMany(
    () => SEventsOrderObj,
    (sEventsOrderObj) => sEventsOrderObj.idEventOrder2
  )
  sEventsOrderObjs: SEventsOrderObj[];

  @OneToMany(
    () => SEventsOrderQueDef,
    (sEventsOrderQueDef) => sEventsOrderQueDef.idEventOrder2
  )
  sEventsOrderQueDefs: SEventsOrderQueDef[];

  @OneToMany(
    () => SEventsPrivate,
    (sEventsPrivate) => sEventsPrivate.idEventOrder2
  )
  sEventsPrivates: SEventsPrivate[];
}
