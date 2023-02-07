import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("s_form1", { schema: "doc" })
export class SForm1 {
  @PrimaryGeneratedColumn({ type: "int", name: "id_form", unsigned: true })
  idForm: number;

  @Column("varchar", {
    name: "form_name",
    nullable: true,
    comment: "Название документа",
    length: 255,
  })
  formName: string | null;

  @Column("int", { name: "id_parent", nullable: true, unsigned: true })
  idParent: number | null;

  @Column("varchar", {
    name: "pril_name",
    nullable: true,
    comment: "Название приложения",
    length: 255,
  })
  prilName: string | null;

  @Column("int", {
    name: "pril_num",
    nullable: true,
    comment: "Номер приложения (шапка)",
    unsigned: true,
  })
  prilNum: number | null;

  @Column("date", { name: "date_record", nullable: true })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    nullable: true,
    comment: "0-",
    unsigned: true,
  })
  active: number | null;

  @Column("int", { name: "uid", nullable: true })
  uid: number | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-надзорникиБ1-пожарники",
    unsigned: true,
  })
  org: number | null;

  @Column("varchar", {
    name: "header",
    nullable: true,
    comment: "Шапка",
    length: 255,
  })
  header: string | null;
}
