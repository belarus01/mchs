import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SSubjLic } from "./SSubjLic";

@Index("FK_s_subj_lic_date_id_lic", ["idLic"], {})
@Entity("s_subj_lic_date", { schema: "mchs" })
export class SSubjLicDate {
  @PrimaryGeneratedColumn({ type: "int", name: "id_list", unsigned: true })
  idList: number;

  @Column("int", {
    name: "id_lic",
    nullable: true,
    comment:
      "Ид. лицензии ЕРЛ,разрешения(свидетельство Госпромнадзора),декларации о промышленной безоп.ОПО",
    unsigned: true,
  })
  idLic: number | null;

  @Column("date", {
    name: "date_from",
    nullable: true,
    comment:
      "Даты заключений по результатам экспертизы(для лицензий), Даты разработки (пересомтра декларации)",
  })
  dateFrom: string | null;

  @Column("date", {
    name: "date_to",
    nullable: true,
    comment: "Даты (не используется пока)",
  })
  dateTo: string | null;

  @Column("tinyint", {
    name: "org",
    comment: "0-Госнадзор, 1-пожарники,2-все",
    unsigned: true,
    default: () => "'2'",
  })
  org: number;

  @Column("date", {
    name: "date_record",
    nullable: true,
    comment: "Дата изменения записи",
  })
  dateRecord: string | null;

  @Column("tinyint", {
    name: "active",
    comment: "Статус лицензии 0-остановлена, 1-активно,2-удалена",
    unsigned: true,
    default: () => "'1'",
  })
  active: number;

  @Column("int", {
    name: "uid",
    nullable: true,
    comment: "Пользователь, изменивший запись",
    unsigned: true,
  })
  uid: number | null;

  @ManyToOne(() => SSubjLic, (sSubjLic) => sSubjLic.sSubjLicDates, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_lic", referencedColumnName: "idLic" }])
  idLic2: SSubjLic;
}
