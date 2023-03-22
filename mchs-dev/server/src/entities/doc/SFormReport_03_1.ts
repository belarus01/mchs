import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SForm } from "./SForm";

@Index("FK_s_form_report_id_event_order", ["idEventOrder"], {})
@Index("FK_s_form_report_id_form", ["idForm"], {})
@Entity("s_form_report_03_1", { schema: "doc" })
export class SFormReport_03_1 {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: string;

  @Column("int", { name: "id_form", nullable: true, unsigned: true })
  idForm: number | null;

  @Column("bigint", { name: "id_event_order", nullable: true, unsigned: true })
  idEventOrder: string | null;

  @Column("tinyint", {
    name: "num_appendix",
    nullable: true,
    comment: "Номер приложения",
    unsigned: true,
  })
  numAppendix: number | null;

  @Column("varchar", {
    name: "path_temp",
    nullable: true,
    comment: "Черновик",
    length: 255,
  })
  pathTemp: string | null;

  @Column("varchar", {
    name: "num_doc",
    nullable: true,
    comment: "Номер документа",
    length: 255,
  })
  numDoc: string | null;

  @Column("date", {
    name: "date_doc",
    nullable: true,
    comment: "Дата  документа ",
  })
  dateDoc: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники",
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

  @Column("text", { name: "comm", nullable: true, comment: "Примечание" })
  comm: string | null;

  @Column("text", {
    name: "other_info",
    nullable: true,
    comment: "Иные сведения (текст в нижней части предписания)",
  })
  otherInfo: string | null;

  @ManyToOne(() => SForm, (sForm) => sForm.sFormReport_03S, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_form", referencedColumnName: "idForm" }])
  idForm2: SForm;
}
