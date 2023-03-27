import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";

@Index("type_data", ["typeData"], {})
@Index("s_events_order_data_FK_1", ["uid"], {})
@Index("FK_s_events_order_data_id_event_order", ["idEventOrder"], {})
@Entity("s_events_order_data", { schema: "mchs" })
export class SEventsOrderData {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_data", unsigned: true })
  idData: number;

  @Column("varchar", {
    name: "path",
    nullable: true,
    comment: "путь",
    length: 250,
  })
  path: string | null;

  @Column("tinyint", {
    name: "type_data",
    nullable: true,
    comment: "Тип данных 1-фото,2-чек-лист,3-электронный документ,4-прочее",
    unsigned: true,
  })
  typeData: number | null;

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
    comment: "Дата окончания",
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
  status: string | null;

  @Column("text", { name: "comm", nullable: true, comment: "Комментарий" })
  comm: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, создавший/изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment: "Мероприятие/задание/пользователь",
    unsigned: true,
  })
  idEventOrder: number | null;

  @Column("bigint", {
    name: "id_doc",
    nullable: true,
    comment:
      "Ид. в таблице в завитимости от типа документа, например 1-id_chlist_form,2- id_report",
    unsigned: true,
  })
  idDoc: number | null;

  @Column("date", {
    name: "date_creation",
    nullable: true,
    comment: "Дата направления",
  })
  dateCreation: Date | null;

  @ManyToOne(
    () => SEventsOrder,
    (sEventsOrder) => sEventsOrder.sEventsOrderData,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;
}
