import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_opo", { schema: "doc" })
export class SOpo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_opo", unsigned: true })
  idOpo: number;

  @Column("varchar", { name: "num", nullable: true, length: 255 })
  num: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "наименование ОПО",
    length: 715,
  })
  name: string | null;

  @Column("varchar", {
    name: "type_1",
    nullable: true,
    comment: "Наименование 1 типа опасности",
    length: 255,
  })
  type_1: string | null;

  @Column("varchar", {
    name: "type_2",
    nullable: true,
    comment: "Наименование 2 типа опасности",
    length: 255,
  })
  type_2: string | null;

  @Column("varchar", {
    name: "type_3",
    nullable: true,
    comment: "Наименование 3 типа опасности",
    length: 255,
  })
  type_3: string | null;

  @Column("int", { name: "id_parent", nullable: true, unsigned: true })
  idParent: number | null;

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
    default: () => "'now()'",
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
