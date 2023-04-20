import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_events_tnpa", { schema: "mchs" })
export class SEventsTnpa {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("bigint", {
    name: "id_event",
    nullable: true,
    comment: "Мероприятие",
    unsigned: true,
  })
  idEvent: string | null;

  @Column("bigint", {
    name: "id_doc",
    nullable: true,
    comment: "s_tnpa_doc.id_doc Тип части документа",
  })
  idDoc: string | null;

  @Column("text", {
    name: "data",
    nullable: true,
    comment: "Содержание части документа",
  })
  data: string | null;

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

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, создавший/изменивший запись",
    unsigned: true,
  })
  uid: number | null;
}
