import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SForm } from "./SForm";

@Index("UK_s_defection", ["idTnpa", "numReg", "punctTnpa"], { unique: true })
@Index("FK_s_defection_id_form", ["idForm"], {})
@Entity("s_defection", { schema: "doc" })
export class SDefection {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_def", unsigned: true })
  idDef: string;

  @Column("int", {
    name: "id_tnpa",
    comment: "Ид.ТНПА, пункт которого нарушен ",
    unsigned: true,
  })
  idTnpa: number;

  @Column("int", {
    name: "num_reg",
    comment: "Порядковый номер нарушения",
    unsigned: true,
  })
  numReg: number;

  @Column("varchar", {
    name: "name_def",
    nullable: true,
    comment: "Содержание нарушения",
    length: 855,
  })
  nameDef: string | null;

  @Column("varchar", {
    name: "recomend",
    nullable: true,
    comment:
      "Предписывающее (рекомендованное) мероприятие, которое будет содержаться в предписании (рекомендациях)",
    length: 855,
  })
  recomend: string | null;

  @Column("varchar", {
    name: "short_tnpa",
    nullable: true,
    comment:
      "Основание: нормативный правовой акт, требования которого нарушены (пункт, подпункт, часть и т.д.)",
    length: 855,
  })
  shortTnpa: string | null;

  @Column("varchar", {
    name: "type_doc",
    nullable: true,
    comment: "Тип документа",
    length: 255,
  })
  typeDoc: string | null;

  @Column("varchar", {
    name: "chapter_tnpa",
    nullable: true,
    comment: "Раздел",
    length: 685,
  })
  chapterTnpa: string | null;

  @Column("varchar", {
    name: "head_tnpa",
    nullable: true,
    comment: "Наименование нарушения в имен.падеже ",
    length: 255,
  })
  headTnpa: string | null;

  @Column("varchar", {
    name: "article_tnpa",
    nullable: true,
    comment: "Статья",
    length: 250,
  })
  articleTnpa: string | null;

  @Column("varchar", {
    name: "punct_tnpa",
    nullable: true,
    comment: "пункт ТНПА нарушения",
    length: 50,
  })
  punctTnpa: string | null;

  @Column("varchar", {
    name: "subpunct_tnpa",
    nullable: true,
    comment: "Подпункт",
    length: 50,
  })
  subpunctTnpa: string | null;

  @Column("varchar", {
    name: "part_tnpa",
    nullable: true,
    comment: "Часть",
    length: 55,
  })
  partTnpa: string | null;

  @Column("varchar", {
    name: "paragr_tnpa",
    nullable: true,
    comment: "Абзац",
    length: 155,
  })
  paragrTnpa: string | null;

  @Column("varchar", {
    name: "preamble_tnpa",
    nullable: true,
    comment: "Преамбула",
    length: 55,
  })
  preambleTnpa: string | null;

  @Column("varchar", {
    name: "ch_list",
    nullable: true,
    comment: "Чек лист",
    length: 555,
  })
  chList: string | null;

  @Column("varchar", {
    name: "num_question",
    nullable: true,
    comment: "Номер вопроса",
    length: 25,
  })
  numQuestion: string | null;

  @Column("varchar", {
    name: "rule_punct",
    nullable: true,
    comment: "Пункт Правил",
    length: 855,
  })
  rulePunct: string | null;

  @Column("tinyint", {
    name: "org",
    nullable: true,
    comment: "0-Госнадзор, 1-пожарники,2-другие",
    unsigned: true,
  })
  org: number | null;

  @Column("int", { name: "id_form", nullable: true, unsigned: true })
  idForm: number | null;

  @Column("tinyint", {
    name: "type_def",
    nullable: true,
    comment: "0-нарушения МТХ,1-нарушения ЧЛ",
    unsigned: true,
    default: () => "'0'",
  })
  typeDef: number | null;

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
    default: () => "'0'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @ManyToOne(() => SForm, (sForm) => sForm.sDefections, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_form", referencedColumnName: "idForm" }])
  idForm2: SForm;
}
