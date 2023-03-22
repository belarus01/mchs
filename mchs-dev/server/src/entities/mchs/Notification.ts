import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("notification_users_from_FK", ["fromUid"], {})
@Index("notification_s_events_order_FK", ["idEventOrder"], {})
@Index("n_task_result_FK", ["idTaskResult"], {})
@Index("notification_users_FK", ["uid"], {})
@Entity("notification", { schema: "mchs" })
export class Notification {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
  idList: number;

  @Column("tinyint", {
    name: "status",
    comment: "0 - UNSENT,1 - NEW,2 - UPDATED,3 - DELETED,4-просмотрено",
    unsigned: true,
    default: () => "'1'",
  })
  status: number;

  @Column("varchar", {
    name: "content",
    nullable: true,
    comment: "содержание уведомления",
    length: 255,
  })
  content: string | null;

  @Column("int", { name: "uid", comment: "кому уведомление", unsigned: true })
  uid: number;

  @Column("datetime", { name: "date_time", nullable: true })
  dateTime: Date | null;

  @Column("int", {
    name: "from_uid",
    nullable: true,
    comment: "от кого",
    unsigned: true,
  })
  fromUid: number | null;

  @Column("int", {
    name: "id_task_result",
    nullable: true,
    comment: " пока не используется ",
    unsigned: true,
  })
  idTaskResult: number | null;

  @Column("bigint", { name: "id_event_order", nullable: true, unsigned: true })
  idEventOrder: string | null;

  @Column("int", { name: "to_uid", nullable: true, unsigned: true })
  toUid: number | null;
}
