import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_folders", { schema: "mchs" })
export class UserFolders {
  @PrimaryGeneratedColumn({ type: "int", name: "folder_id", unsigned: true })
  folderId: number;

  @Column("int", {
    name: "uid",
    comment: "Пользователь - владелец, если 0 - Общая для всех пользователей",
    unsigned: true,
  })
  uid: number;

  @Column("varchar", { name: "folder", length: 100 })
  folder: string;

  @Column("tinyint", {
    name: "type",
    comment: "Тип 0 - стандартная, 1 - пользовательская",
    unsigned: true,
    default: () => "'0'",
  })
  type: number;

  @Column("int", { name: "cnt", unsigned: true, default: () => "'0'" })
  cnt: number;

  @Column("int", { name: "id_dept", nullable: true })
  idDept: number | null;

  @Column("varchar", { name: "path_doc", nullable: true, length: 100 })
  pathDoc: string | null;

  @Column("int", {
    name: "id_event_order",
    nullable: true,
    comment: "Задание",
    unsigned: true,
  })
  idEventOrder: number | null;
}
