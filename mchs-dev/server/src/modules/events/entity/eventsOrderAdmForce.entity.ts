import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
import { SAdmForce } from "src/modules/adm/entity/admForce.entity";
import { SSubjObj } from "src/modules/object/entity/object.entity";
import { SFormReport } from "src/modules/form/entity/formReport.entity";


@Index("FK_s_events_order_adm_force_id_event_order", ["idEventOrder"], {})
@Index("FK_s_events_order_adm_force_id_force", ["idForce"], {})
@Index("FK_s_events_order_adm_force_id_obj", ["idObj"], {})
@Index("FK_s_events_order_adm_force_id_report", ["idReport"], {})
@Entity("s_events_order_adm_force", { schema: "mchs" })
export class SEventsOrderAdmForce {
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
    comment: "Отдельнный объект. Если NULL, то штрафуется весь  id_subj",
    unsigned: true,
  })
  idObj: number | null;

  @Column("bigint", { name: "id_sub_obj", nullable: true, unsigned: true })
  idSubObj: number | null;

  @Column("int", {
    name: "id_force",
    nullable: true,
    comment: "тип нарушения",
    unsigned: true,
  })
  idForce: number | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: Date | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия записи",
  })
  dateBegin: Date | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: Date | null;

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

  @Column("date", {
    name: "date_force",
    nullable: true,
    comment: "Дата направления",
  })
  dateForce: Date | null;

  @Column("varchar", {
    name: "num_case",
    nullable: true,
    comment: "№административного дела, вид ответственности",
    length: 255,
  })
  numCase: string | null;

  @Column("varchar", {
    name: "staff",
    nullable: true,
    comment: "Должность нарушителя",
    length: 255,
  })
  staff: string | null;

  @Column("varchar", {
    name: "fio",
    nullable: true,
    comment: "фио нарушителя",
    length: 255,
  })
  fio: string | null;

  @Column("int", {
    name: "id_type_case",
    nullable: true,
    comment:
      "Вид ответственности  0-административная ответственность,1-уголовная,2-предупреждение",
    unsigned: true,
  })
  idTypeCase: number | null;

  @Column("datetime", {
    name: "date_cath",
    nullable: true,
    comment:
      "Дата, время выявленных нарушений законодательства о пожарной безопасности",
  })
  dateCath: Date | null;

  @Column("text", {
    name: "obst_sposob",
    nullable: true,
    comment: "обстоятельства и способ совершения правонарушения",
  })
  obstSposob: string | null;

  @Column("bigint", {
    name: "id_report",
    nullable: true,
    comment: "ид. записи составленного документа",
    unsigned: true,
  })
  idReport: number | null;

  @ManyToOne(
    () => SEventsOrder,
    (sEventsOrder) => sEventsOrder.sEventsOrderAdmForces,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;

  @ManyToOne(() => SAdmForce, (sAdmForce) => sAdmForce.sEventsOrderAdmForces, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_force", referencedColumnName: "idForce" }])
  idForce2: SAdmForce;

  @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sEventsOrderAdmForces, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_obj", referencedColumnName: "idObj" }])
  idObj2: SSubjObj;

  @ManyToOne(
    () => SFormReport,
    (sFormReport) => sFormReport.sEventsOrderAdmForces,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "id_report", referencedColumnName: "idList" }])
  idReport2: SFormReport;
}
