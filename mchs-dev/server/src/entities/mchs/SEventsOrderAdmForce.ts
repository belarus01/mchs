import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("FK_s_events_order_adm_force_id_force", ["idForce"], {})
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
  idEventOrder: string | null;

  @Column("int", { name: "id_force", nullable: true, unsigned: true })
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
  dateRecord: string | null;

  @Column("date", {
    name: "date_begin",
    nullable: true,
    comment: "Дата начала действия записи",
  })
  dateBegin: string | null;

  @Column("date", {
    name: "date_end",
    nullable: true,
    comment: "Дата окончания действия записи",
  })
  dateEnd: string | null;

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

  @Column("date", { name: "date_force", nullable: true, comment: "Дата" })
  dateForce: string | null;

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

  @Column("varchar", {
    name: "num_case",
    nullable: true,
    comment: "№административного дела, вид ответственности",
    length: 1255,
  })
  numCase: string | null;
}
