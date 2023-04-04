import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsOrder } from "./eventsOrder.entity";
import { User } from "src/modules/users/user.entity";

@Index("FK_s_events_private_id_event_order2", ["idEventOrder"], {})
@Index("FK_s_events_private_uid2", ["uid"], {})
@Index("FK_s_events_private_uid_adm", ["uidAdm"], {})
@Entity("s_events_private", { schema: "mchs" })
export class SEventsPrivate {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_priv", unsigned: true })
  idPriv: number;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment:
      "Мероприятие, в рамках которого создается частная задача. NULL-если не относится к мероприятию ",
    unsigned: true,
  })
  idEventOrder: number | null;

  @Column("bigint", {
    name: "id_unit",
    comment: "Текущее состояние.Берем из doc.s_units.type_unit=11",
    unsigned: true,
  })
  idUnit: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь",
    unsigned: true,
  })
  uid: number | null;

  @Column("varchar", {
    name: "name_event",
    nullable: true,
    comment: "Наименование (частной) задачи пользователя",
    length: 55,
  })
  nameEvent: string | null;

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

  @Column("varchar", {
    name: "status",
    nullable: true,
    comment:
      "Не используется пока что.   Статус задачи:1-не спланирована,2-в работе,3- завершена, 4-просрочена, 5 одобрена",
    length: 50,
    default: () => "'wait'",
  })
  status: string | null;

  @Column("text", {
    name: "comm",
    nullable: true,
    comment: "Комментарий пользователя",
  })
  comm: string | null;

  @Column("date", {
    name: "date_order",
    nullable: true,
    comment: "Дата одобрения/отклонения контролирующим лицом",
  })
  dateOrder: Date | null;

  @Column("int", {
    name: "uid_adm",
    nullable: true,
    comment: "Руководитель ",
    unsigned: true,
  })
  uidAdm: number | null;

  @ManyToOne(
    () => SEventsOrder,
    (sEventsOrder) => sEventsOrder.sEventsPrivates,
    { onDelete: "NO ACTION", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;

  @ManyToOne(() => User, (users) => users.sEventsPrivates, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "uid", referencedColumnName: "uid" }])
  u: User;
}
