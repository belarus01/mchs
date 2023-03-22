import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("group", { schema: "mchs" })
export class Group {
  @PrimaryGeneratedColumn({ type: "int", name: "id_group", unsigned: true })
  idGroup: number;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-госнадзор,1-пожарники",
    unsigned: true,
  })
  org: number | null;

  @Column("varchar", { name: "name", nullable: true, length: 50 })
  name: string | null;

  @Column("int", { name: "id_dept", nullable: true })
  idDept: number | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-неактивно,1-активно,2-удален,",
    unsigned: true,
    default: () => "'1'",
  })
  active: number | null;

  @Column("datetime", {
    name: "date_record",
    nullable: true,
    default: () => "'now()'",
  })
  dateRecord: Date | null;

  @Column("bigint", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, внесший изменения",
    unsigned: true,
  })
  uid: string | null;
}
