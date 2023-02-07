import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { STypeDoc } from "./STypeDoc";

@Index("FK_s_doc_id_type_doc", ["idTypeDoc"], {})
@Entity("s_form", { schema: "doc" })
export class SForm {
  @PrimaryGeneratedColumn({ type: "int", name: "id_form", unsigned: true })
  idForm: number;

  @Column("int", {
    name: "id_type_doc",
    nullable: true,
    comment: "Тип документа",
    unsigned: true,
  })
  idTypeDoc: number | null;

  @Column("tinyint", {
    name: "num_appendix",
    nullable: true,
    comment: "Номер приложения",
    unsigned: true,
  })
  numAppendix: number | null;

  @Column("varchar", {
    name: "name_doc",
    nullable: true,
    comment: "Номер документа об оценке соответствия",
    length: 255,
  })
  nameDoc: string | null;

  @Column("date", {
    name: "date_from",
    nullable: true,
    comment: "Дата начала действия документа об оценке соответствия",
  })
  dateFrom: string | null;

  @Column("date", {
    name: "date_to",
    nullable: true,
    comment: "Дата окончания действия документа об оценке соответствия",
  })
  dateTo: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-ГУБОП",
    unsigned: true,
    default: () => "'0'",
  })
  org: number;

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

  @Column("tinyint", {
    name: "active",
    comment: "1-активная запись,2 - удалено",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("varchar", {
    name: "comm",
    nullable: true,
    comment: "Примечание",
    length: 255,
  })
  comm: string | null;

  @ManyToOne(() => STypeDoc, (sTypeDoc) => sTypeDoc.sForms, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_type_doc", referencedColumnName: "idTypeDoc" }])
  idTypeDoc2: STypeDoc;
}
