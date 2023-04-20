import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
import { SSubjObj } from "src/modules/object/entity/object.entity";


@Index("FK_s_events_order_obj_id_event_order", ["idEventOrder"], {})
@Index("FK_s_events_order_obj_id_obj", ["idObj"], {})
@Index("FK_s_events_order_obj_id_type_test", ["idTypeTest"], {})
@Index("FK_s_events_order_obj_id_unit_17", ["idUnit_17"], {})
@Index("FK_s_events_order_obj_id_unit_41", ["idUnit_41"], {})
@Index("FK_s_events_order_obj_id_unit_6", ["idUnit_6"], {})
@Entity("s_events_order_obj", { schema: "mchs" })
export class SEventsOrderObj {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "id_obj_order",
    unsigned: true,
  })
  idObjOrder: string;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment: "Мероприятие",
    unsigned: true,
  })
  idEventOrder: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "название объекта",
    length: 255,
  })
  name: string | null;

  @Column("bigint", { name: "id_obj", nullable: true, unsigned: true })
  idObj: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("int", {
    name: "id_type_test",
    nullable: true,
    comment: "1-здание,2-помещение,3-наружная установка",
    unsigned: true,
  })
  idTypeTest: number | null;

  @Column("varchar", {
    name: "addr_staff",
    nullable: true,
    comment: "Адрес службы/ответственного ",
    length: 255,
  })
  addrStaff: string | null;

  @Column("varchar", {
    name: "name_staff",
    nullable: true,
    comment:
      "Ответственный за обесп.пож.безоп. субъекта (или какой-то другой ответственный на этом месте)",
    length: 255,
  })
  nameStaff: string | null;

  @Column("varchar", {
    name: "job_staff",
    nullable: true,
    comment: "Должность ответственного за промышленную безопасность субъекта",
    length: 255,
  })
  jobStaff: string | null;

  @Column("varchar", { name: "tel_staff", nullable: true, length: 255 })
  telStaff: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-надзор, 1-пожарники,2-общий объект",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

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
    name: "addr_exect",
    nullable: true,
    comment: "Уточнение места нахождения",
    length: 255,
  })
  addrExect: string | null;

  @Column("bigint", {
    name: "id_unit_41",
    nullable: true,
    comment: "Катег.зданий/нар.уст.по взрывопож.и пожарной опасности",
    unsigned: true,
  })
  idUnit_41: string | null;

  @Column("decimal", { name: "area", nullable: true, precision: 10, scale: 3 })
  area: string | null;

  @Column("bigint", {
    name: "id_unit_6",
    nullable: true,
    comment:
      "doc.s_units.id_unit (где type_unit=6)Классы функциональной пожарной безопасности",
    unsigned: true,
  })
  idUnit_6: string | null;

  @Column("bigint", {
    name: "id_unit_17",
    nullable: true,
    comment: "'Катег.зданий/нар.уст.по взрывопож.и пожарной опасности",
    unsigned: true,
  })
  idUnit_17: string | null;

  @Column("int", {
    name: "id_sub_obj",
    nullable: true,
    comment: "Подобъект объекта (подъемный кран, склад, установка......)",
    unsigned: true,
  })
  idSubObj: number | null;

  @Column("tinyint", {
    name: "type_sub_obj",
    nullable: true,
    comment:
      "Таблица с подобъектами.1-mchs.s_subj_obj_specif (Здания),\r\n2-doc.s_sopb_card_subj (СПБиП),\r\n3-s_poo_subj_pb (ПБ),\r\n4-s_pog_subj_auto (ПОГ авто),\r\n5-s_pog_subj_avia (ПОГ авиа\r\n6-s_pog_subj_rw (ПОГ жд\r\n7-s_pog_subj_water (ПОГ вода),",
    unsigned: true,
  })
  typeSubObj: number | null;

  @ManyToOne(
    () => SEventsOrder,
    (sEventsOrder) => sEventsOrder.sEventsOrderObjs,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;

  @ManyToOne(() => SSubjObj, (sSubjObj) => sSubjObj.sEventsOrderObjs, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_obj", referencedColumnName: "idObj" }])
  idObj2: SSubjObj;
}
