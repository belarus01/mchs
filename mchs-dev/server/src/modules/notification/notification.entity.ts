//(хммм а нужна ли связь на group...)
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "../events/entity/eventsOrder.entity";
import { TaskResult } from "../task/entity/taskResult.entity";
import { User } from "../users/user.entity";

@Index("notification_users_FK", ["toUid"], {})
@Index("n_task_result_FK", ["idTaskResult"], {})
@Index("notification_s_events_order_FK", ["idEventOrder"], {})
@Index("notification_users_from_FK", ["fromUid"], {})
@Entity("notification", { schema: "mchs" })
export class Notification {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
  id: number;

  @Column("int", {
    name: "status",
    comment:
    "0 - UNSENT,1 - NEW,2 - UPDATED,3 - DELETED",
    default: () => "'1'",
  })
  status: number;

  @Column("text", {
    name: "content",
    nullable: true,
    comment: "содержание уведомления",
  })
  content: string | null;

  @Column("int", {
    name: "uid",
    comment: "кому уведомление",
    unsigned: true,
  })
  toUid: number | null;//для тестинга оставим пока: что может быть налл

  @Column("date", {
    name: "date_time",
    nullable: true,
  })
  date: Date | null;

  @Column("int", {
    name: "from_uid",
    nullable: true,
    comment: "от кого",
    unsigned: true,
  })
  fromUid: number | null;

  @Column("int", { name: "id_task_result", nullable: true, unsigned: true })
  idTaskResult: number | null;

  @Column("bigint", { name: "id_event_order", nullable: true, unsigned: true })
  idEventOrder: number | null;

  @ManyToOne(() => SEventsOrder, (sEventsOrder) => sEventsOrder.notifications, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;

  @ManyToOne(() => TaskResult, (taskResult) => taskResult.notifications, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "id_task_result", referencedColumnName: "idTaskResult" },
  ])
  idTaskResult2: TaskResult;

  @ManyToOne(() => User, (users) => users.notifications, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "to_uid", referencedColumnName: "uid" }])
  toU: User;

  @ManyToOne(() => User, (users) => users.notifications2, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "from_uid", referencedColumnName: "uid" }])
  fromU: User;
}
