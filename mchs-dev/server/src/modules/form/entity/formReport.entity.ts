import { SEventsOrder } from "src/modules/events/entity/eventsOrder.entity";
import { SEventsOrderAdmBan } from "src/modules/events/entity/eventsOrderAdmBan.entity";
import { SEventsOrderAdmForce } from "src/modules/events/entity/eventsOrderAdmForce.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SForm } from "./form.entity";
/* import { SEventsOrderAdmBan } from "./SEventsOrderAdmBan";
import { SEventsOrderAdmForce } from "./SEventsOrderAdmForce";
import { SEventsOrder } from "./SEventsOrder";
import { SForm } from "./SForm"; */

@Index("FK_s_form_report_id_event_order", ["idEventOrder"], {})
@Index("FK_s_form_report_id_form", ["idForm"], {})
@Entity("s_form_report", { schema: "mchs" })
export class SFormReport {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id_list", unsigned: true })
  idList: number;

  @Column("int", { name: "id_form", nullable: true, unsigned: true })
  idForm: number | null;

  @Column("bigint", { name: "id_event_order", nullable: true, unsigned: true })
  idEventOrder: number | null;

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
  dateDoc: Date | null;

  @Column("varchar", {
    name: "addr_record",
    nullable: true,
    comment: "Место составления документа",
    length: 85,
  })
  addrRecord: string | null;

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
    comment: "Ид.пользователя, составившего документ",
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

  @Column("text", {
    name: "comm",
    nullable: true,
    comment:
      "Замечания (возражения), если id_form (42 ,1019)сюда пишется решение по возражению по акту",
  })
  comm: string | null;

  @Column("text", {
    name: "other_info",
    nullable: true,
    comment: "Иные сведения (текст в нижней части предписания)",
  })
  otherInfo: string | null;

  @Column("varchar", {
    name: "receiver",
    nullable: true,
    comment:
      "Кому вручен (направлен) акт (справка)... проверки  (должность, фамилия)",
    length: 255,
  })
  receiver: string | null;

  @Column("date", {
    name: "date_rec",
    nullable: true,
    comment: "Дата вручения (направления) акта (справки).... проверки...",
  })
  dateRec: Date | null;

  @Column("tinyint", {
    name: "fl_rec",
    nullable: true,
    comment: "0-в руки,1-почтой,2-факсом",
    unsigned: true,
  })
  flRec: number | null;

  @Column("tinyint", {
    name: "fl_book",
    nullable: true,
    comment:
      "книга учета проверок у субъекта. 0-не представлена,1-представлена",
    unsigned: true,
  })
  flBook: number | null;

  @Column("varchar", {
    name: "num_book",
    nullable: true,
    comment: "Номер записи в книге учета проверок у субъекта",
    length: 55,
  })
  numBook: string | null;

  @Column("datetime", {
    name: "date_book",
    nullable: true,
    comment: "Дата записи в книге учета проверок у субъекта",
  })
  dateBook: Date | null;

  @OneToMany(
    () => SEventsOrderAdmBan,
    (sEventsOrderAdmBan) => sEventsOrderAdmBan.idReport2
  )
  sEventsOrderAdmBans: SEventsOrderAdmBan[];

  @OneToMany(
    () => SEventsOrderAdmForce,
    (sEventsOrderAdmForce) => sEventsOrderAdmForce.idReport2
  )
  sEventsOrderAdmForces: SEventsOrderAdmForce[];

  @ManyToOne(() => SEventsOrder, (sEventsOrder) => sEventsOrder.sFormReports, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_event_order", referencedColumnName: "idEventOrder" },
  ])
  idEventOrder2: SEventsOrder;

  @ManyToOne(() => SForm, (sForm) => sForm.sFormReports, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_form", referencedColumnName: "idForm" }])
  idForm2: SForm;
}
