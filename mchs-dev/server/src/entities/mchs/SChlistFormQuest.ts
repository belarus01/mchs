import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("type_event", ["typeEvent"], {})
@Entity("s_chlist_form_quest", { schema: "mchs" })
export class SChlistFormQuest {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_quest", unsigned: true })
  idQuest: string;

  @Column("bigint", {
    name: "id_event_order",
    nullable: true,
    comment: "Задание",
    unsigned: true,
  })
  idEventOrder: string | null;

  @Column("int", {
    name: "num_order",
    nullable: true,
    comment: "Порядок вывода",
    unsigned: true,
  })
  numOrder: number | null;

  @Column("int", {
    name: "id_chlist_form",
    nullable: true,
    comment: "Ид.формы",
    unsigned: true,
  })
  idChlistForm: number | null;

  @Column("varchar", {
    name: "type_event",
    nullable: true,
    comment: "Тип задания не используется",
    length: 20,
  })
  typeEvent: string | null;

  @Column("varchar", {
    name: "low",
    nullable: true,
    comment: "Структурные элементы нормативных правовых актов",
    length: 100,
  })
  low: string | null;

  @Column("tinyint", {
    name: "yes",
    nullable: true,
    comment: "да",
    unsigned: true,
  })
  yes: number | null;

  @Column("tinyint", {
    name: "no",
    nullable: true,
    comment: "нет",
    unsigned: true,
  })
  no: number | null;

  @Column("tinyint", {
    name: "no_need",
    nullable: true,
    comment: "не требуется",
    unsigned: true,
  })
  noNeed: number | null;

  @Column("text", { name: "note", nullable: true, comment: "примечание" })
  note: string | null;

  @Column("varchar", {
    name: "letter",
    nullable: true,
    comment: "Литера",
    length: 2,
  })
  letter: string | null;

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
    comment: "Владелец",
    unsigned: true,
  })
  uid: number | null;
}
