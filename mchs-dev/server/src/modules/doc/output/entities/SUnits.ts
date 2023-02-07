import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_units", { schema: "doc" })
export class SUnits {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_unit", unsigned: true })
  idUnit: string;

  @Column("bigint", { name: "id_parent", nullable: true, unsigned: true })
  idParent: string | null;

  @Column("int", {
    name: "type_unit",
    nullable: true,
    comment:
      "0-сферы контроля, 1-класс опасности,2-Наименование контролирующих органов",
    unsigned: true,
  })
  typeUnit: number | null;

  @Column("varchar", {
    name: "num_",
    nullable: true,
    comment: "Номер (ООН опасных грузов чл_4)",
    length: 55,
  })
  num: string | null;

  @Column("varchar", {
    name: "type",
    nullable: true,
    comment: "Тип опасности",
    length: 60,
  })
  type: string | null;

  @Column("varchar", {
    name: "type_sub",
    nullable: true,
    comment: "Подкласс опсных грузов (чл_4)",
    length: 21,
  })
  typeSub: string | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "Описание опасности",
    length: 550,
  })
  name: string | null;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "'now()'",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "0-удалено, 1-актино",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("tinyint", {
    name: "org",
    comment: "0-госнадзор, 1-пожарники, 2",
    unsigned: true,
    default: () => "'1'",
  })
  org: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменения",
    unsigned: true,
  })
  uid: number | null;

  @Column("varchar", { name: "comm", nullable: true, length: 55 })
  comm: string | null;
}
