import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_poo", { schema: "doc" })
export class SPoo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_poo", unsigned: true })
  idPoo: number;

  @Column("varchar", {
    name: "num",
    nullable: true,
    comment: "номер",
    length: 25,
  })
  num: string | null;

  @Column("int", { name: "id_parent", nullable: true, unsigned: true })
  idParent: number | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "наименование",
    length: 715,
  })
  name: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники",
    unsigned: true,
    default: () => "'0'",
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
    comment: "0-удалено, 1-активно",
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
}
