import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
import { SDept } from "src/modules/department/entity/department.entity";
import { SEvents } from "./events.entity";
import { SUnits } from "src/modules/unit/unit.entity";
/* import { SEventsOrder } from "./SEventsOrder";
import { SDept } from "./SDept";
import { SEvents } from "./SEvents";
import { SUnits } from "./SUnits"; */

@Index("FK_s_events_plan_id_dept", ["idDept"], {})
@Index("FK_s_events_plan_id_event2", ["idEvent"], {})
@Index("FK_s_events_plan_id_subj", ["idSubj"], {})
@Index("FK_s_events_plan_id_unit_3", ["idUnit_3"], {})
@Index("FK_s_events_plan_id_unit_4", ["idUnit_4"], {})
@Index(
  "UK_s_events_plan",
  ["numOrder", "unpDept", "unpSubj", "org", "yearPlan", "halfyearEvent"],
  { unique: true }
)
@Entity("s_events_plan", { schema: "mchs" })
export class SEventsPlan {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id_event_plan",
    unsigned: true,
  })
  idEventPlan: number;

  @Column("bigint", {
    name: "id_event",
    nullable: true,
    comment: "Мероприятие",
    unsigned: true,
  })
  idEvent: number | null;

  @Column("bigint", { name: "id_subj", nullable: true, unsigned: true })
  idSubj: number | null;

  @Column("int", {
    name: "id_dept",
    nullable: true,
    comment: "Контр.орган, которому поручено проведение проверки",
    unsigned: true,
  })
  idDept: number | null;

  @Column("varchar", {
    name: "num_order",
    nullable: true,
    comment: "№ пункта плана проверок",
    length: 50,
  })
  numOrder: string | null;

  @Column("varchar", {
    name: "unp_dept",
    nullable: true,
    comment: "УНП Контр.органа, которому поручено проведение проверки",
    length: 255,
  })
  unpDept: string | null;

  @Column("varchar", {
    name: "name_dept",
    nullable: true,
    comment: "Наимен. Контр.органа, которому поручено проведение проверки",
    length: 255,
  })
  nameDept: string | null;

  @Column("bigint", {
    name: "id_unit_3",
    nullable: true,
    comment:
      "Вид надзорно-профилактического мероприятия (1-проверка,2- мониторинг,3- обследование).\r\nБерем из  doc.s_units.type_unit=4 поле name",
    unsigned: true,
    default: () => "'81'",
  })
  idUnit_3: number | null;

  @Column("bigint", {
    name: "id_unit_4",
    nullable: true,
    comment:
      "Тип проверки 1-выборочная,2-внеплановая,3-для использ.при планир.проверок.Берем из  doc.s_units.type_unit=3 поле name",
    unsigned: true,
    default: () => "'91'",
  })
  idUnit_4: number | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-госпромнадзор,1-пожарники",
    unsigned: true,
    default: () => "'0'",
  })
  org: number | null;

  @Column("varchar", {
    name: "month_event",
    nullable: true,
    comment: "Месяц,год начала проверки",
    length: 25,
  })
  monthEvent: string | null;

  @Column("tinyint", {
    name: "halfyear_event",
    nullable: true,
    comment: "Полугодие плана проерки 1-янв.,2-февр.,3-март,4-апрель",
    default: () => "'1'",
  })
  halfyearEvent: number | null;

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
    default: () => "'wait'",
  })
  status: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменение",
    unsigned: true,
  })
  uid: number | null;

  @Column("int", { name: "id_obl", nullable: true })
  idObl: number | null;

  @Column("varchar", { name: "unp_subj", nullable: true, length: 55 })
  unpSubj: string | null;

  @Column("varchar", { name: "name_subj", nullable: true, length: 555 })
  nameSubj: string | null;

  @Column("varchar", { name: "tel_user", nullable: true, length: 185 })
  telUser: string | null;

  @Column("int", { name: "year_plan", nullable: true, unsigned: true })
  yearPlan: number | null;

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idEventPlan2)
  sEventsOrders: SEventsOrder[];

  @ManyToOne(() => SDept, (sDept) => sDept.sEventsPlans, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_dept", referencedColumnName: "idDept" }])
  idDept2: SDept;

  @ManyToOne(() => SEvents, (sEvents) => sEvents.sEventsPlans, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_event", referencedColumnName: "idEvent" }])
  idEvent2: SEvents;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sEventsPlans, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_unit_3", referencedColumnName: "idUnit" }])
  idUnit: SUnits;

  @ManyToOne(() => SUnits, (sUnits) => sUnits.sEventsPlans2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_unit_4", referencedColumnName: "idUnit" }])
  idUnit_2: SUnits;
}
