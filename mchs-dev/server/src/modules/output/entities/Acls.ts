import { Column, Entity, Index } from "typeorm";

@Index("FK_acls_objects_oid", ["oid"], {})
@Entity("acls", { schema: "mchs" })
export class Acls {
  @Column("int", { primary: true, name: "uid", unsigned: true })
  uid: number;

  @Column("int", { primary: true, name: "oid", unsigned: true })
  oid: number;

  @Column("int", { primary: true, name: "rid", unsigned: true })
  rid: number;

  @Column("tinyint", { name: "r", width: 1, default: () => "'0'" })
  r: boolean;

  @Column("tinyint", { name: "w", width: 1, default: () => "'0'" })
  w: boolean;

  @Column("tinyint", { name: "d", width: 1, default: () => "'0'" })
  d: boolean;
}
