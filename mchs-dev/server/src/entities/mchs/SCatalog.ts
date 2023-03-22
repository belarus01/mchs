import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_catalog", { schema: "mchs" })
export class SCatalog {
  @PrimaryGeneratedColumn({ type: "int", name: "id_catalog", unsigned: true })
  idCatalog: number;

  @Column("varchar", {
    name: "name_catalog",
    nullable: true,
    comment: "Наименование справочника",
    length: 120,
  })
  nameCatalog: string | null;

  @Column("varchar", { name: "table_name", nullable: true, length: 55 })
  tableName: string | null;

  @Column("varchar", {
    name: "id_",
    nullable: true,
    comment: "Первичный ключ справочника",
    length: 15,
  })
  id: string | null;

  @Column("int", { name: "id_parent", nullable: true, unsigned: true })
  idParent: number | null;

  @Column("tinyint", {
    name: "type_catalog",
    comment: "1-общий,0-местный",
    unsigned: true,
    default: () => "'1'",
  })
  typeCatalog: number;

  @Column("tinyint", {
    name: "type_update",
    comment:
      "0 - ручное редактирование,1-загрузка, 2-загрузка и ручное редактирование,3-автоматическое",
    unsigned: true,
    default: () => "'1'",
  })
  typeUpdate: number;

  @Column("tinyint", {
    name: "type_user_upd",
    comment:
      "разреш.обновление:0 - всем,1-админ безопасности, 2-админам подразделений",
    unsigned: true,
    default: () => "'1'",
  })
  typeUserUpd: number;

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,0 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateRecord: Date | null;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Ид.пользователя, внесшего изменения",
    unsigned: true,
  })
  uid: number | null;
}
