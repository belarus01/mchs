import { Column, Entity } from "typeorm";

@Entity("user_settings", { schema: "mchs" })
export class UserSettings {
  @Column("int", {
    primary: true,
    name: "uid",
    unsigned: true,
    default: () => "'0'",
  })
  uid: number;

  @Column("tinyint", {
    primary: true,
    name: "arm",
    comment: "0- Oper, 1 - Admin",
    unsigned: true,
    default: () => "'0'",
  })
  arm: number;

  @Column("tinyint", {
    primary: true,
    name: "type",
    comment: "0 - Auto save, 1 - ManualSave",
    unsigned: true,
    default: () => "'0'",
  })
  type: number;

  @Column("varchar", { primary: true, name: "name", length: 200 })
  name: string;

  @Column("mediumtext", { name: "value", nullable: true })
  value: string | null;
}
