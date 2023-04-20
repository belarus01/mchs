import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SEventsDef } from "./SEventsDef";
import { SEventsOrder } from "./SEventsOrder";
import { SEventsPlan } from "./SEventsPlan";
import { SEventsQue } from "./SEventsQue";

@Index("type_event", ["numEvent"], {})
@Index("FK_s_events_id_unit_4", ["idUnit_4"], {})
@Entity("s_events", { schema: "mchs" })
export class SEvents {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_event", unsigned: true })
  idEvent: string;

  @Column("varchar", {
    name: "event",
    nullable: true,
    comment: "Мероприятие",
    length: 520,
  })
  event: string | null;

  @Column("int", {
    name: "num_event",
    nullable: true,
    comment: "Номер мероприятия",
    unsigned: true,
  })
  numEvent: number | null;

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
    comment: "Дата внесения изменений",
  })
  dateEnd: Date | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("bigint", {
    name: "id_unit_4",
    nullable: true,
    comment: "тип проверки, 1-МТХ, 2-проверка,3-мониторинг",
    unsigned: true,
  })
  idUnit_4: string | null;

  @Column("text", { name: "data", nullable: true })
  data: string | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, создавший/изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @OneToMany(() => SEventsDef, (sEventsDef) => sEventsDef.idEvent2)
  sEventsDefs: SEventsDef[];

  @OneToMany(() => SEventsOrder, (sEventsOrder) => sEventsOrder.idEvent2)
  sEventsOrders: SEventsOrder[];

  @OneToMany(() => SEventsPlan, (sEventsPlan) => sEventsPlan.idEvent2)
  sEventsPlans: SEventsPlan[];

  @OneToMany(() => SEventsQue, (sEventsQue) => sEventsQue.idEvent2)
  sEventsQues: SEventsQue[];
}
